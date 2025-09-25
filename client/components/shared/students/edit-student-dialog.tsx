"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { levels, subLevels, relationships, genders } from "@/lib/utils";
import { useEffect, useState } from "react";
import { nigeriaStatesAndLgas } from "@/lib/state-local-gvt";
import { toast } from "sonner";
import Resizer from "react-image-file-resizer";

interface EditStudentFormData {
  studentId?: string;
  firstName: string;
  lastName: string;
  otherName?: string;
  gender: string;
  dateOfBirth: string;
  level: string;
  subLevel: string;
  stateOfOrigin: string;
  localGvt: string;
  homeTown: string;
  isPaid: boolean;
  isStudent: boolean;
  sponsorName: string;
  sponsorEmail: string;
  sponsorPhoneNumber: string;
  sponsorRelationship: string;
  yearAdmitted: string;
  image?: string; // ✅ added image field
}

interface EditStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  formData: EditStudentFormData;
  setFormData: React.Dispatch<React.SetStateAction<EditStudentFormData>>;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export default function EditStudentDialog({
  open,
  onOpenChange,
  formData,
  setFormData,
  onSubmit,
  isLoading,
}: EditStudentDialogProps) {
  const [lgas, setLgas] = useState<string[]>([]);

  useEffect(() => {
    if (formData.stateOfOrigin) {
      const newLgas = nigeriaStatesAndLgas[formData.stateOfOrigin] || [];
      setLgas(newLgas);
    } else {
      setLgas([]);
    }
  }, [formData.stateOfOrigin]);

  // ✅ Strict typing for Promise<string>
  const resizeFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      try {
        Resizer.imageFileResizer(
          file,
          640,
          510,
          "JPEG",
          70,
          0,
          (uri) => {
            if (typeof uri === "string") {
              resolve(uri);
            } else {
              reject("Failed to resize image");
            }
          },
          "base64"
        );
      } catch (err) {
        reject(err);
      }
    });

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const resizedImage = await resizeFile(file);

      // ✅ Attach image to formData
      setFormData((prev) => ({
        ...prev,
        image: resizedImage,
      }));



      
    } catch (error) {
      toast.error("Error resizing image");
      console.error("Error resizing image:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (
    field: keyof EditStudentFormData,
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Student</DialogTitle>
          <DialogDescription>Update student details.</DialogDescription>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-3">
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
            name="otherName"
            value={formData.otherName}
            onChange={handleInputChange}
            placeholder="Other Name"
          />
          <Input
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            type="date"
          />

          <Label>Gender</Label>
          <Select
            value={formData.gender}
            onValueChange={(value) => handleSelectChange("gender", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Gender" />
            </SelectTrigger>
            <SelectContent>
              {genders.map((g) => (
                <SelectItem key={g} value={g}>
                  {g}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Class</Label>
          <Select
            value={formData.level}
            onValueChange={(value) => handleSelectChange("level", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Level" />
            </SelectTrigger>
            <SelectContent>
              {levels.map((l) => (
                <SelectItem key={l} value={l}>
                  {l}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Sub Class</Label>
          <Select
            value={formData.subLevel}
            onValueChange={(value) => handleSelectChange("subLevel", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Sub-Level" />
            </SelectTrigger>
            <SelectContent>
              {subLevels.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="yearAdmitted"
            value={formData.yearAdmitted}
            onChange={handleInputChange}
            placeholder="Year Admitted"
            type="number"
          />

          <Label>State of Origin</Label>
          <Select
            value={formData.stateOfOrigin}
            onValueChange={(value) =>
              handleSelectChange("stateOfOrigin", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select State" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(nigeriaStatesAndLgas).map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Label>Local Government</Label>
          <Select
            value={formData.localGvt}
            onValueChange={(value) => handleSelectChange("localGvt", value)}
            disabled={!lgas.length}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select LGA" />
            </SelectTrigger>
            <SelectContent>
              {lgas.map((lga, index) => (
                <SelectItem
                  key={`${formData.stateOfOrigin}-${lga}-${index}`}
                  value={lga}
                >
                  {lga}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="homeTown"
            value={formData.homeTown}
            onChange={handleInputChange}
            placeholder="Home Town"
          />

          <Input
            name="sponsorName"
            value={formData.sponsorName}
            onChange={handleInputChange}
            placeholder="Sponsor Name"
          />

          <Label>Sponsor Relationship</Label>
          <Select
            value={formData.sponsorRelationship}
            onValueChange={(value) =>
              handleSelectChange("sponsorRelationship", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Sponsor Relationship" />
            </SelectTrigger>
            <SelectContent>
              {relationships.map((r) => (
                <SelectItem key={r} value={r}>
                  {r}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Input
            name="sponsorPhoneNumber"
            value={formData.sponsorPhoneNumber}
            onChange={handleInputChange}
            placeholder="Sponsor Phone"
          />
          <Input
            name="sponsorEmail"
            value={formData.sponsorEmail}
            onChange={handleInputChange}
            placeholder="Sponsor Email"
          />

          <Input type="file" accept="image/*" onChange={handleImageChange} />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Updating...
              </>
            ) : (
              "Update Student"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
