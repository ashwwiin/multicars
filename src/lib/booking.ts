export type BookingInput = {
  name: string;
  phone: string;
  email?: string;
  vehicle?: string;
  registration?: string;
  service?: string;
  symptom?: string;
  date?: string;
  slot?: string;
  notes?: string;
  /** Honeypot: real people never fill this in. */
  company?: string;
  source?: string;
};

export type BookingErrors = Partial<Record<keyof BookingInput, string>>;

const clean = (v: unknown, max = 500) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export function normalise(raw: unknown): BookingInput {
  const r = (raw ?? {}) as Record<string, unknown>;
  return {
    name: clean(r.name, 80),
    phone: clean(r.phone, 30),
    email: clean(r.email, 120),
    vehicle: clean(r.vehicle, 80),
    registration: clean(r.registration, 20),
    service: clean(r.service, 80),
    symptom: clean(r.symptom, 80),
    date: clean(r.date, 20),
    slot: clean(r.slot, 30),
    notes: clean(r.notes, 1000),
    company: clean(r.company, 80),
    source: clean(r.source, 20),
  };
}

export function validate(input: BookingInput): BookingErrors {
  const errors: BookingErrors = {};
  if (input.name.length < 2) errors.name = "Enter your name.";
  const digits = input.phone.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    errors.phone = "Enter a phone number we can call, with 7 to 15 digits.";
  }
  if (input.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.email)) {
    errors.email = "Enter a valid email address, or leave it empty.";
  }
  return errors;
}
