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
import { Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { levels, subLevels, roles, statuses } from '@/lib/utils';



interface EditUserFormData {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  status?: string;
  level: string;
  subLevel: string;
  isAdmin?: string;
}

interface EditUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: EditUserFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditUserFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  title?: string;
}

export default function EditUserDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: EditUserDialogProps) {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
            <DialogDescription>Update user information.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={onSubmit}
            className="max-h-[350px] overflow-y-auto space-y-4"
          >
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
            <Input
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />

            <Label htmlFor="role">Select Role</Label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="w-full border rounded p-2 bg-background text-foreground"
            >
              <option value="">Assign Role</option>
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>

            <Label htmlFor="level">Select Level</Label>
            <select
              name="level"
              value={formData.level}
              onChange={handleInputChange}
              className="w-full border rounded p-2 bg-background text-foreground"
            >
              <option value="">Select Level</option>
              {levels.map((lvl) => (
                <option key={lvl} value={lvl}>
                  {lvl}
                </option>
              ))}
            </select>

            <Label htmlFor="subLevel">Select Sub-Level</Label>
            <select
              name="subLevel"
              value={formData.subLevel}
              onChange={handleInputChange}
              className="w-full border rounded p-2 bg-background text-foreground"
            >
              <option value="">Select Sub-Level</option>
              {subLevels.map((sub) => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            <Label htmlFor="status">Select Status</Label>
            <select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className="w-full border rounded p-2 bg-background text-foreground"
            >
              <option value="">Select Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <Label htmlFor="isAdmin">Is Admin?</Label>
            <select
              name="isAdmin"
              value={formData.isAdmin}
              onChange={handleInputChange}
              className="w-full border rounded p-2 bg-background text-foreground"
            >
              <option value="">Select Option</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>

            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Updating...
                </>
              ) : (
                "Update User"
              )}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
