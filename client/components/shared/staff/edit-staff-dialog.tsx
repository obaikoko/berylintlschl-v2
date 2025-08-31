'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import NaijaStates from 'naija-state-local-government';
import {
  useUpdateStaffMutation,
  useGetAllStaffQuery,
} from '@/src/features/staff/staffApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { StaffSchema } from '@/schemas/staffSchema';

const GENDERS = ['Male', 'Female'];
const MARITAL_STATUSES = ['Single', 'Married', 'Divorced', 'Widowed'];
const CATEGORIES = ['Academic', 'Non-academic'];
const QUALIFICATIONS = [
  'Professor',
  'Phd',
  'Masters',
  'Bachelors Degree',
  'HND',
  'OND',
  'NCE',
  'SSCE',
];

interface EditStaffDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  staff: StaffSchema;
}

export default function EditStaffDialog({
  open,
  onOpenChange,
  staff,
}: EditStaffDialogProps) {
  const [updateStaff, { isLoading }] = useUpdateStaffMutation();
  const { refetch } = useGetAllStaffQuery({});

  const [formData, setFormData] = useState({
    firstName: staff.firstName || '',
    lastName: staff.lastName || '',
    phone: staff.phone || '',
    email: staff.email || '',
    role: staff.role || '',
    qualification: staff.qualification || '',
    gender: staff.gender || '',
    maritalStatus: staff.maritalStatus || '',
    category: staff.category || '',
    stateOfOrigin: staff.stateOfOrigin || '',
    localGvt: staff.localGvt || '',
    homeTown: staff.homeTown || '',
    residence: staff.residence || '',
  });

  const [lgas, setLgas] = useState<string[]>([]);

  useEffect(() => {
    if (formData.stateOfOrigin) {
      const newLgas = NaijaStates.lgas(formData.stateOfOrigin)?.lgas || [];
      setLgas(newLgas);
    } else {
      setLgas([]);
    }
  }, [formData.stateOfOrigin]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateStaff({ staffId: staff.id, ...formData }).unwrap();
      refetch();
      toast.success('Staff updated successfully');
      onOpenChange(false);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <DialogTitle>Edit Staff</DialogTitle>
          <DialogDescription>Update staff details below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className='space-y-3'>
          <Input
            name='firstName'
            value={formData.firstName}
            onChange={handleInputChange}
            placeholder='First Name'
          />
          <Input
            name='lastName'
            value={formData.lastName}
            onChange={handleInputChange}
            placeholder='Last Name'
          />
          <Input
            name='phone'
            value={formData.phone}
            onChange={handleInputChange}
            placeholder='Phone'
          />
          <Input
            name='email'
            value={formData.email}
            onChange={handleInputChange}
            placeholder='Email'
          />
          <Input
            name='role'
            value={formData.role}
            onChange={handleInputChange}
            placeholder='Role'
          />

          <Label>Qualification</Label>
          <Select
            value={formData.qualification}
            onValueChange={(value) =>
              handleSelectChange('qualification', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Qualification' />
            </SelectTrigger>
            <SelectContent>
              {QUALIFICATIONS.map((q) => (
                <SelectItem key={q} value={q}>
                  {q}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleSelectChange('gender', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Gender' />
            </SelectTrigger>
            <SelectContent>
              {GENDERS.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Marital Status</Label>
          <Select
            value={formData.maritalStatus}
            onValueChange={(value) =>
              handleSelectChange('maritalStatus', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Marital Status' />
            </SelectTrigger>
            <SelectContent>
              {MARITAL_STATUSES.map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => handleSelectChange('category', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Category' />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>State of Origin</Label>
          <Select
            value={formData.stateOfOrigin}
            onValueChange={(value) =>
              handleSelectChange('stateOfOrigin', value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder='Select State' />
            </SelectTrigger>
            <SelectContent>
              {NaijaStates.states().map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Local Government</Label>
          <Select
            value={formData.localGvt}
            onValueChange={(value) => handleSelectChange('localGvt', value)}
            disabled={!lgas.length}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select Local Government' />
            </SelectTrigger>
            <SelectContent>
              {lgas.map((lga) => (
                <SelectItem key={lga} value={lga}>
                  {lga}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name='homeTown'
            value={formData.homeTown}
            onChange={handleInputChange}
            placeholder='Home Town'
          />
          <Input
            name='residence'
            value={formData.residence}
            onChange={handleInputChange}
            placeholder='Residence'
          />

          <Button type='submit' disabled={isLoading} className='w-full'>
            {isLoading ? (
              <>
                <Loader2 className='h-4 w-4 animate-spin mr-2' />
                Updating...
              </>
            ) : (
              'Update Staff'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
