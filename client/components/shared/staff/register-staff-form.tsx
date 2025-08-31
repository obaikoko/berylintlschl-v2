'use client';
import NaijaStates from 'naija-state-local-government';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { showZodErrors } from '@/lib/utils';
import { StaffFormData } from '@/schemas/staffSchema';
import { staffFormSchema } from '@/validators/staffValidator';
import { useRegisterStaffMutation } from '@/src/features/staff/staffApiSlice';
import { useState } from 'react';

const RegisterStaffForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StaffFormData>({
    resolver: zodResolver(staffFormSchema),
  });

  const [registerStudent, { isLoading }] = useRegisterStaffMutation();
  const [selectedState, setSelectedState] = useState('');
  const states: string[] = NaijaStates.states();
  const getLgas = (state: string): string[] => NaijaStates.lgas(state).lgas;

  const onSubmit = async (data: StaffFormData) => {
    try {
      await registerStudent(data).unwrap();
      toast.success(` registered successfully`);
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='firstName'>First Name</Label>
          <Input id='firstName' {...register('firstName')} />
          {errors.firstName && (
            <p className='text-sm text-red-500'>{errors.firstName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input id='lastName' {...register('lastName')} />
          {errors.lastName && (
            <p className='text-sm text-red-500'>{errors.lastName.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='otherName'>Other Name</Label>
          <Input id='otherName' {...register('otherName')} />
        </div>
        <div>
          <Label htmlFor='dateOfBirth'>Date of Birth</Label>
          <Input type='date' id='dateOfBirth' {...register('dateOfBirth')} />
          {errors.dateOfBirth && (
            <p className='text-sm text-red-500'>{errors.dateOfBirth.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='maritalStatus'>MaritalStatus</Label>
          <Select onValueChange={(value) => setValue('maritalStatus', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select maritalStatus' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Single'>Single</SelectItem>
              <SelectItem value='Married'>Married</SelectItem>
              <SelectItem value='Divorced'>Divorced</SelectItem>
              <SelectItem value='Widowed'>Widowed</SelectItem>
            </SelectContent>
          </Select>
          {errors.maritalStatus && (
            <p className='text-sm text-red-500'>
              {errors.maritalStatus.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='gender'>Gender</Label>
          <Select onValueChange={(value) => setValue('gender', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select gender' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Male'>Male</SelectItem>
              <SelectItem value='Female'>Female</SelectItem>
            </SelectContent>
          </Select>
          {errors.gender && (
            <p className='text-sm text-red-500'>{errors.gender.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='gender'>Qualification</Label>
          <Select onValueChange={(value) => setValue('qualification', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select qualification' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Professor'>Professor</SelectItem>
              <SelectItem value='Phd'>Phd</SelectItem>
              <SelectItem value='Masters'>Masters</SelectItem>
              <SelectItem value='Bachelors Degree'>Bachelors Degree</SelectItem>
              <SelectItem value='HND'>HND</SelectItem>
              <SelectItem value='OND'>OND</SelectItem>
              <SelectItem value='NCE'>NCE</SelectItem>
              <SelectItem value='SSCE'>SSCE</SelectItem>
            </SelectContent>
          </Select>
          {errors.qualification && (
            <p className='text-sm text-red-500'>
              {errors.qualification.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='category'>Category</Label>
          <Select onValueChange={(value) => setValue('category', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select category' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Academic'>Academic</SelectItem>
              <SelectItem value='Non-academic'>Non-academic</SelectItem>
            </SelectContent>
          </Select>

          {errors.category && (
            <p className='text-sm text-red-500'>{errors.category.message}</p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Label htmlFor='role'>Role</Label>
          <Input id='role' {...register('role')} />
          {errors.role && (
            <p className='text-sm text-red-500'>{errors.role.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor='yearAdmitted'>Year Admitted</Label>
          <Input
            id='yearAdmitted'
            type='date'
            {...register('yearAdmitted')}
            placeholder='e.g., 2023'
          />
          {errors.yearAdmitted && (
            <p className='text-sm text-red-500'>
              {errors.yearAdmitted.message}
            </p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='stateOfOrigin'>State of Origin</Label>
          <Select
            onValueChange={(value) => {
              setValue('stateOfOrigin', value);
              setSelectedState(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder='Select state' />
            </SelectTrigger>
            <SelectContent>
              {states.map((state: string) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.stateOfOrigin && (
            <p className='text-sm text-red-500'>
              {errors.stateOfOrigin.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor='localGvt'>Local Govt</Label>
          <Select onValueChange={(value) => setValue('localGvt', value)}>
            <SelectTrigger>
              <SelectValue placeholder='Select LGA' />
            </SelectTrigger>
            <SelectContent>
              {(selectedState ? getLgas(selectedState) : []).map(
                (lga: string) => (
                  <SelectItem key={lga} value={lga}>
                    {lga}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.localGvt && (
            <p className='text-sm text-red-500'>{errors.localGvt.message}</p>
          )}
        </div>
        <div className='md:col-span-2'>
          <Label htmlFor='homeTown'>Home Town</Label>
          <Input id='homeTown' {...register('homeTown')} />
          {errors.homeTown && (
            <p className='text-sm text-red-500'>{errors.homeTown.message}</p>
          )}
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='phone'>Phone Number</Label>
          <Input id='phone' {...register('phone')} />
          {errors.phone && (
            <p className='text-sm text-red-500'>{errors.phone.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='residence'>Residence</Label>
          <Input id='residence' {...register('residence')} />
          {errors.residence && (
            <p className='text-sm text-red-500'>{errors.residence.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor='email'>Email</Label>
          <Input id='email' {...register('email')} />
          {errors.email && (
            <p className='text-sm text-red-500'>{errors.email.message}</p>
          )}
        </div>
      </div>

      <Button type='submit' className='w-full' disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Register Staff'}
      </Button>
    </form>
  );
};

export default RegisterStaffForm;
