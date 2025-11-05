import { apiSlice } from '../apiSlice';
import { BILLING_URL } from '../constants';

export interface FeeItem {
  id?: string;
  name: string;
  amount: number;
}

export interface Payment {
  id: string;
  amount: number;
  method: string;
  note?: string;
  paidAt?: string;
  recordedBy?: { id: string; firstName: string; lastName: string };
}

export interface Invoice {
  id: string;
  studentId: string;
  term: string;
  session: string;
  dueDate?: string;
  totalAmount: number;
  status: 'unpaid' | 'partial' | 'paid';
  items: FeeItem[];
  payments: Payment[];
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    level?: string;
    subLevel?: string;
  };
  createdAt?: string;
}

export interface ListInvoicesResponse {
  invoices: Invoice[];
  page: number;
  totalPages: number;
}

export const billingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    listInvoices: builder.query<
      ListInvoicesResponse,
      {
        keyword?: string;
        studentId?: string;
        term?: string;
        session?: string;
        status?: string;
        pageNumber?: number;
      } | void
    >({
      query: (params) => ({
        url: BILLING_URL,
        params: params || {},
        credentials: "include",
      }),
      providesTags: ["Billing"] ,
    }),

    createInvoice: builder.mutation<
      Invoice,
      {
        studentId: string;
        term: string;
        session: string;
        dueDate?: string;
        items: FeeItem[];
      }
    >({
      query: (body) => ({
        url: BILLING_URL,
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Billing"] ,
    }),

    updateInvoice: builder.mutation<
      Invoice,
      {
        id: string;
        term?: string;
        session?: string;
        dueDate?: string | null;
        items?: FeeItem[];
        status?: "unpaid" | "partial" | "paid";
      }
    >({
      query: ({ id, ...body }) => ({
        url: `${BILLING_URL}/${id}`,
        method: "PUT",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Billing"] ,
    }),

    recordPayment: builder.mutation<
      Payment,
      {
        invoiceId: string;
        amount: number;
        method: string;
        note?: string;
        paidAt?: string;
      }
    >({
      query: (body) => ({
        url: `${BILLING_URL}/payments`,
        method: "POST",
        body,
        credentials: "include",
      }),
      invalidatesTags: ["Billing"] ,
    }),

    summaryReport: builder.query<
      {
        totalCollected: number;
        byMethod: Record<string, number>;
        byRecorder: Record<string, number>;
        count: number;
      },
      {
        startDate?: string;
        endDate?: string;
        term?: string;
        session?: string;
        level?: string;
        subLevel?: string;
      } | void
    >({
      query: (params) => ({
        url: `${BILLING_URL}/reports/summary`,
        params: params || {},
        credentials: "include",
      }),
      providesTags: ["Billing"] ,
    }),

    studentStatement: builder.query<
      {
        // statement: any[];
        totals: {
          totalInvoiced: number;
          totalPaid: number;
          totalBalance: number;
        };
      },
      { studentId: string; term?: string; session?: string }
    >({
      query: (params) => ({
        url: `${BILLING_URL}/reports/statement`,
        params,
        credentials: "include",
      }),
      providesTags: ["Billing"] ,
    }),
    deleteInvoice: builder.mutation({
  query: (id: string) => ({
    url: `${BILLING_URL}/${id}`,
    method: "DELETE",
    credentials: "include",
  }),
  invalidatesTags: ["Billing"],
}),

  }),
});

export const {
  useListInvoicesQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useRecordPaymentMutation,
  useSummaryReportQuery,
  useStudentStatementQuery,
  useDeleteInvoiceMutation,
} = billingApiSlice;


