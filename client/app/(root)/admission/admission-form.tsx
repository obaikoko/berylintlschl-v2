'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdmissionFormData} from '@/schemas/admissionSchema';
import { admissionForm } from '@/validators/admissionValidators';
import { useCreateAdmissionMutation } from '@/src/features/admission/admissionApiSlice';
import { toast } from 'sonner';
import { showZodErrors } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  User, 
  Mail, 
  Phone, 
  Baby, 
  Calendar, 
  GraduationCap,
  Send,
  Loader2
} from 'lucide-react';

const AdmissionForm = () => {
  const [createAdmission, { isLoading }] = useCreateAdmissionMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AdmissionFormData>({
    resolver: zodResolver(admissionForm),
  });

  const onSubmit = async (data: AdmissionFormData) => {
    try {
      await createAdmission(data).unwrap();
      toast.success('Application submitted successfully!');
      reset();
    } catch (err) {
      showZodErrors(err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
          Admission Application Form
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300">
          Complete the form below to begin your child&apos;s educational journey with us
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Parent Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <User className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Parent/Guardian Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300">
                  First Name *
                </Label>
                <Input 
                  id="firstName" 
                  {...register('firstName')}
                  className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300">
                  Last Name *
                </Label>
                <Input 
                  id="lastName" 
                  {...register('lastName')}
                  className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    id="email" 
                    {...register('email')}
                    className="h-12 pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter email address"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input 
                    id="phone" 
                    {...register('phone')}
                    className="h-12 pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter phone number"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.phone.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Child Information */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <Baby className="w-6 h-6 text-green-600" />
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Child Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="childName" className="text-gray-700 dark:text-gray-300">
                  Child&apos;s Full Name *
                </Label>
                <Input 
                  id="childName" 
                  {...register('childName')}
                  className="h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                                      placeholder="Enter child&apos;s full name"
                />
                {errors.childName && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.childName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-700 dark:text-gray-300">
                  Child&apos;s Gender *
                </Label>
                <select
                  id="gender"
                  {...register('gender')}
                  className="w-full h-12 px-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                {errors.gender && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.gender.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300">
                  Date of Birth *
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="date"
                    id="dateOfBirth"
                    {...register('dateOfBirth')}
                    className="h-12 pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                {errors.dateOfBirth && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="level" className="text-gray-700 dark:text-gray-300">
                  Class Applying For *
                </Label>
                <div className="relative">
                  <GraduationCap className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <select
                    id="level"
                    {...register('level')}
                    className="w-full h-12 pl-10 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="">Select Class</option>
                    <option value="creche">Creche/Nursery</option>
                    <option value="Grade 1">Grade 1</option>
                    <option value="Grade 2">Grade 2</option>
                    <option value="Grade 3">Grade 3</option>
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="JSS 1">JSS 1</option>
                    <option value="JSS 2">JSS 2</option>
                    <option value="SSS 1">SSS 1</option>
                  </select>
                </div>
                {errors.level && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <span>⚠</span>
                    {errors.level.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit" 
              disabled={isLoading}
              className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Application
                </>
              )}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              * Required fields. We&apos;ll contact you within 24-48 hours to discuss next steps.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdmissionForm;