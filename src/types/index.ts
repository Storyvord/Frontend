import { z } from "zod";
import {
  announcementFormSchema,
  calenderFormSchema,
  projectFormSchema,
  taskFormSchema,
} from "../lib/validation";
import { FieldValues, Path } from "react-hook-form";

export type FormFieldConfig<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  type:
    | "text"
    | "link"
    | "password"
    | "number"
    | "email"
    | "textarea"
    | "checkbox"
    | "date"
    | "file"
    | "datetime-local"
    | "select";
  isMulti?: boolean; // this is only for type select
  options?: { value: string | number; label: string }[]; // this is only for type select
  placeholder?: string;
  disabled?: boolean;
  optional?: boolean; // this is for optional fields
  note?: string;
  title?: string;
  routeTo?: string;
};

interface project {
  id: number;
  name: string;
  start_date?: string;
  end_date?: string;
  budget?: string;
  location?: string;
  status: boolean;
}

export type SignUpFormData = {
  email: string;
  userType: string;
  password: string;
  confirmPassword: string;
};

export type projectArray = project[];

type itemType = {
  text: string;
  link: string;
  icon: React.FC;
};

export type projectDetailItem = {
  title: string;
  items: itemType[];
};

export type CalenderFormType = {
  title: string;
  start: string;
  end: string;
  description?: string;
  location?: string;
  // participants: number[];
};

export type CalenderEventTypeWithId = CalenderFormType & {
  id: string;
  participants?: string[];
};

export type projectFormInputType = z.infer<typeof projectFormSchema>;

export type announcementFormInputType = z.infer<typeof announcementFormSchema>;
export type AnnouncementFormFieldConfig = {
  name: keyof announcementFormInputType; // Ensures the name matches a key in the form type
  label: string;
  type: "text" | "textarea" | "date" | "file" | "checkbox";
  placeholder?: string;
};

export type Announcements = {
  title: string;
  message: string;
  project: string;
  recipients: number[];
  is_urgent?: boolean;
};

export type CalenderFormFieldType = z.infer<typeof calenderFormSchema>;
export type CalenderFormFieldConfig = {
  name: keyof CalenderFormFieldType;
  label: string;
  type: "text" | "datetime-local" | "textarea" | "select";
  required: boolean;
};

export type CalenderEventType = {
  start: string;
  end: string;
  id: number;
  title: string;
  description: string | null;
  document?: string | null;
  location: string | null;
  calendar: number;
  participants: number[];
};

export type RoomFormData = {
  id: string;
  name: string;
  description: string;
  accessRight: string | never[];
};

export type UploadFileFormData = {
  name: string;
  file: string | ArrayBuffer | File | null;
};

export type ReturnAnnouncements = Announcements & {
  id: number;
  created_at: string;
  updated_at: string;
};

export type taskType = {
  id: number;
  project: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  completion_requested: boolean;
  // project?: { name: string };
  assigned_to: number[];
  requester: number | null;
  created_by: number;
};

export type taskFormType = z.infer<typeof taskFormSchema>;

export interface CrewMember {
  name: string;
  yoe: number; // Years of Experience
  minRatePerDay: string; // Keeping it as string if that's how it comes from the backend
  maxRatePerDay: string; // Keeping it as string if that's how it comes from the backend
  location: string;
  profile_pic: string;
  preferred_because: string;
}

export interface CrewRequirement {
  role: string;
  location: string;
  crewMembers: CrewMember[];
}

export interface CrewData {
  project_id: string;
  project_name: string;
  crew_requirements_set: CrewRequirement[];
}

export type SelectedCrewMember = {
  id: number;
  profile_pic: string;
  name: string;
  userid: string;
  crewType: string;
  role: string;
  services: string;
  tags: string;
  expertise: string;
  yoe: number;
  minRatePerDay: string;
  maxRatePerDay: string;
  next_available_date: string;
  location: string;
};

export type PreferredCrewMember = {
  crew_member: SelectedCrewMember;
  preferred_because: string;
};

export type Project = {
  title: string;
  description: string;
  link: string;
  thumbnailUrl: string;
  createTime: string;
};

// Define the FormData interface
export type ClientProfileUpdateFormType = {
  address: string;
  description: string;
  countryName: string;
  firstName: string;
  formalName: string;
  lastName: string;
  locality: string;
  personalWebsite: string;
  role: string;
};

export type ProjectData = {
  imageUrl: string;
  projectTitle: string;
  projectDescription: string;
  projectLink: string;
};

export type PageProps = {
  profileData?: {
    name: string;
    role: string;
    location: string;
    rate: string;
    rating: string;
    reviewScore: string;
    imageUrl: string;
    bio: string;
    topReview: string;
    website: string;
    profileLink: string;
    socialMedia: { name: string; link: string }[];
  };
  projectsData?: ProjectData[];
};
