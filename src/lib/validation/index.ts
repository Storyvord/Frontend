import { z } from "zod";

// Helper function for validating time format (HH:MM)
const timeSchema = z.string().min(1, "Invalid time format");
// .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Invalid time format (HH:MM)");
// .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, "Invalid time format (HH:MM:SS)");

export const projectFormSchema = z.object({
  projectName: z.string().min(1, { message: "Project Name is required" }),
  contentType: z.string().min(1, { message: "Content Type is required" }),
  budget: z
    .number()
    .min(5, { message: "Minimum budget is $5k" })
    .max(200000, { message: "Maximum budget is $200000k" }),
  crew: z.array(
    z.object({
      title: z.string().min(1, { message: "crew is required" }),
      quantity: z.number().min(1, { message: "Value must be greater than 0" }),
    })
  ),
  equipment: z.array(
    z.object({
      title: z.string().min(1, { message: "equipment is required" }),
      quantity: z.number().min(1, { message: "Value must be greater than 0" }),
    })
  ),
  description: z
    .string()
    .min(100, { message: "The project description must be at least 100 words long." }),

  uploadedDocument: z
    .array(
      z.union([
        z.string(),
        z.instanceof(ArrayBuffer).refine((buffer) => buffer.byteLength > 0, {
          message: "Document cannot be an empty ArrayBuffer",
        }),
        z.instanceof(File).refine(
          (file) =>
            (file.type === "image/jpeg" ||
              file.type === "image/png" ||
              file.type === "application/pdf" ||
              file.type === "application/msword" || // For .doc files
              file.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // For .docx files
              file.type === "text/plain") && // For .txt files
            file.size > 0, // Ensure the file is not empty
          {
            message:
              "Only .jpg, .png, .pdf, .doc, .docx, or .txt files are accepted and must not be empty",
          }
        ),
      ])
    )
    .optional(),
  locationDetails: z.array(
    z
      .object({
        location: z.string().min(1, { message: "Location is required" }),
        start_date: z.string().date(),
        end_date: z.string().date(),
        mode_of_shooting: z.enum(["indoor", "outdoor", "both"], {
          errorMap: () => ({ message: "Select a mode of shooting" }),
        }),
        permits: z.boolean(),
      })
      .refine(
        (data) => {
          const startDate = new Date(data.start_date);
          const endDate = new Date(data.end_date);
          return endDate >= startDate;
        },
        {
          message: "End date must be after start date",
          path: ["end_date"], // This will attach the error to the endDate field
        }
      )
  ),
  aiSuggestions: z.boolean(),
});

export const taskFormSchema = z.object({
  title: z.string().min(1, { message: "Task title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  due_date: z.string().date(),
  assigned_to: z.array(z.number()).min(1, "Minimum 1 required"),
});

export const ClientProfileUpdateSchema = z.object({
  address: z.string().min(1, "Address is required"),
  countryName: z.string().min(1, "Country name is required"),
  description: z.string().min(1, "Description is required"),
  firstName: z.string().min(1, "First name is required"),
  formalName: z.string().optional(),
  lastName: z.string().min(1, "Last name is required"),
  locality: z.string().min(1, "Locality is required"),
  personalWebsite: z
    .string()
    .max(100, "Value must be under 100 characters")
    .url("Invalid URL")
    .optional(),
  role: z.string().min(1, "Role is required"),
});

export const announcementFormSchema = z.object({
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
  recipients: z.array(z.number()),
  is_urgent: z.boolean().optional(),
});

export const calenderFormSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    start: z.string().min(1, "Start date and time is required"),
    end: z.string().min(1, "End date and time is required"),
    participants: z.array(z.number()),
    location: z.string().optional(),
    description: z.string().optional(),
  })
  .refine(
    (data) => {
      const startDate = new Date(data.start);
      const endDate = new Date(data.end);
      return endDate >= startDate;
    },
    {
      message: "End date must be after start date",
      path: ["end"], // This will attach the error to the endDate field
    }
  );

export const ExternalContactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  position: z.string().min(1, { message: "Position is required" }),
  departments: z.string().min(1, { message: "Departments is required" }),
  email: z.string().email({ message: "Invalid email address" }),
  phone: z
    .string()
    .min(10, { message: "Phone number should be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must be numeric" }),
  note: z.string().optional(),
});

export const openPositionFormSchema = z.object({
  position: z.string().min(1, { message: "Position is required" }),
  name: z.string().min(1, { message: "Name is required" }),
  departments: z.string().min(1, { message: "Departments are required" }),
  note: z.string().optional(),
});

export const createRoomFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(2, "Description is required"),
  accessRight: z.union([z.number(), z.array(z.number())]),
});

export const uploadFileFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  file: z.union([
    z.string(),
    z.instanceof(ArrayBuffer),
    z.instanceof(File).refine(
      (file) =>
        (file.type === "image/jpeg" ||
          file.type === "image/png" ||
          file.type === "application/pdf" ||
          file.type === "application/msword" || // For .doc files
          file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // For .docx files
          file.type === "text/plain") &&
        file.size <= 5 * 1024 * 1024, // Max size 5MB
      {
        message: "Only .jpg, .png, .pdf, .doc, .docx, or .txt files under 5MB are accepted",
      }
    ),
  ]),
});

export const updateProfileSchema = z.object({
  firstName: z.string().min(1, "First Name is required"), // Minimum length of 1
  lastName: z.string().min(1, "Last Name is required"),
  formalName: z.string().min(1, "Formal Name is required"),
  role: z.string().min(1, "Role is required"),
  description: z.string().optional(), // Optional field
  address: z.string().min(1, "Address is required"),
  countryName: z.string().min(1, "Country Name is required"),
  locality: z.string().min(1, "Locality is required"),
  personalWebsite: z
    .string()
    .url("Invalid URL format") // Validate URL format
    .optional(), // Optional field
  image: z
    .union([
      z.string(),
      z.instanceof(ArrayBuffer),
      z
        .instanceof(File)
        .refine((file) => file.type === "image/jpeg" || file.type === "image/png", {
          message: "Only .jpg or .png files are accepted",
        })
        .refine((file) => file.size <= 5 * 1024 * 1024, {
          message: "File size must be less than or equal to 5MB",
        }),
    ])
    .nullable(),
  phone_number: z
    .string()
    .nullable()
    .or(z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number format")), // Validates E.164 phone format or can be null
});

export const CallSheetFormSchema = z.object({
  // Project Information
  title: z.string().min(1, "Title is required"), // Required string, minimum 1 character
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    // Validates as a date string
    message: "Invalid date format, expected YYYY-MM-DD",
  }),
  calltime: timeSchema, // Time format HH:MM
  location: z.string().min(1, "Location is required"),
  nearest_hospital_address: z.string().optional(),
  nearest_police_station: z.string().optional(),
  nearest_fire_station: z.string().optional(),
  breakfast: z.string().optional(),
  lunch: z.string().optional(),
  dinner: z.string().optional(),

  // Department Instructions
  call_time: z.array(
    z.object({
      name: z.string().min(1, "name is required"),
      position: z.string().min(1, "position are required"),
      phone: z.string().min(1, "phone is required"),
      email: z.string().min(1, "Email is required").email("Invalid email address"),
      calltime: timeSchema,
      remarks: z.string().optional(),
    })
  ),

  additional_notes: z.string().optional(),
  production_notes: z.string().optional(),
  // allowed_users: z.union([z.number(), z.array(z.number())]).optional(),
});

export const scriptValidationSchema = z.object({
  title: z.string().min(2, "Title is required"),
  set: z.string().min(2, "Set is required"),
  environment: z.string().min(2, "Environment is required"),
  scriptDay: z.string().min(2, "Script day is required"),
  point: z.string().min(2, "point is required"),
  description: z.string().min(1, "Description is required"),
  note: z.string().optional(),
});

export const scenesValidationSchema = z.object({
  scenesNumber: z.string().min(2, "Title is required"),
  set: z.string().min(2, "Set is required"),
  environment: z.string().min(2, "Environment is required"),
  scriptDay: z.string().min(2, "Script day is required"),
  point: z.string().min(2, "point is required"),
  description: z.string().min(1, "Description is required"),
  note: z.string().optional(),
});

export const shotValidationSchema = z.object({
  shotId: z.string().min(2, "Shot ID is required"),
  subject: z.string().min(2, "Subject is required"),
  visual: z.string().min(2, "Visual is required"),
  audio: z.string().min(1, "Audio is required"),
  imageAndProduction: z
    .union([
      z.string(),
      z.instanceof(ArrayBuffer).refine((buffer) => buffer.byteLength > 0, {
        message: "Document cannot be an empty ArrayBuffer",
      }),
      z.instanceof(File).refine(
        (file) =>
          (file.type === "image/jpeg" ||
            file.type === "image/png" ||
            file.type === "application/pdf" ||
            file.type === "application/msword" || // For .doc files
            file.type ===
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || // For .docx files
            file.type === "text/plain") && // For .txt files
          file.size > 0, // Ensure the file is not empty
        {
          message:
            "Only .jpg, .png, .pdf, .doc, .docx, or .txt files are accepted and must not be empty",
        }
      ),
    ])
    .optional(),
});

export const shootInformationValidationSchema = z.object({
  size: z.string().min(1, "Size is required"),
  type: z.string().min(1, "Type is required"),
  moment: z.string().min(1, "Moment is required"),
  equipment: z.string().min(1, "Equipment is required"),
  vfx: z.string().min(1, "VFX is required"),
  camera: z.string().min(1, "Camera is required"),
  lens: z.string().min(1, "Lens is required"),
  frameRate: z.string().min(1, "Frame Rate is required"),
  specialEquipment: z.string().min(1, "Special Equipment is required"),
  sound: z.string().min(1, "Sound is required"),
  lighting: z.string().min(1, "Lighting is required"),
  position: z.string().min(1, "Position is required"),
  setupId: z.string().min(1, "Setup ID is required"),
  unit: z.string().min(1, "Unit is required"),
  note: z.string().optional().nullable(),
});
