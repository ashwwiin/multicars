/**
 * Service catalogue.
 * SAMPLE DATA: the services, inclusions, times and "from" prices below are
 * examples. Replace them with the shop's real offering before launch.
 */
export type Service = {
  slug: string;
  name: string;
  summary: string;
  symptoms: string[];
  includes: string[];
  time: string;
  from: number;
  faqs: { q: string; a: string }[];
};

export const services: Service[] = [
  {
    slug: "periodic-service",
    name: "Periodic service and oil change",
    summary:
      "Scheduled maintenance that keeps the engine clean, the fluids fresh and small problems from becoming big ones.",
    symptoms: [
      "Service reminder light is on",
      "It has been 6 months or 5,000 km since the last service",
      "Engine sounds rougher than it used to",
    ],
    includes: [
      "Engine oil and oil filter change",
      "Air filter and cabin filter check",
      "Brake, coolant and washer fluid top-up",
      "Battery, belts and tyre pressure check",
      "Written report of anything that needs attention",
    ],
    time: "3 to 4 hours",
    from: 2499,
    faqs: [
      {
        q: "How often should I service my car?",
        a: "Follow your owner's manual. As a rule of thumb, every 6 months or 5,000 to 10,000 km, whichever comes first.",
      },
      {
        q: "Will you use the oil my manufacturer recommends?",
        a: "Yes. Tell us the grade in your manual or ask us to recommend one, and we confirm it in the quote.",
      },
    ],
  },
  {
    slug: "engine-and-transmission",
    name: "Engine and transmission",
    summary:
      "Diagnosis and repair for engines and gearboxes, from misfires and leaks to clutch and gear problems.",
    symptoms: [
      "Engine shakes, stalls or loses power",
      "Warning light stays on",
      "Gears slip, grind or feel stuck",
      "Oil or fluid leaking under the car",
    ],
    includes: [
      "Computer diagnostic scan",
      "Physical inspection and test drive",
      "Written quote with the fault explained",
      "Repair with your approval only",
    ],
    time: "1 to 3 days, depending on the fault",
    from: 1499,
    faqs: [
      {
        q: "Do I pay for the diagnosis?",
        a: "A diagnostic fee applies and is deducted from the repair bill if you go ahead with the work.",
      },
    ],
  },
  {
    slug: "brakes-and-suspension",
    name: "Brakes, suspension and steering",
    summary:
      "Stopping, handling and ride comfort. We inspect, explain what is worn and fix only what is needed.",
    symptoms: [
      "Brake pedal feels soft or spongy",
      "Squealing or grinding when braking",
      "Car pulls to one side",
      "Bumps feel harsh or the car bounces",
    ],
    includes: [
      "Brake pad, disc and fluid inspection",
      "Suspension and steering component check",
      "Replacement of worn parts with a written quote first",
      "Road test after the work",
    ],
    time: "Half a day to 1 day",
    from: 1799,
    faqs: [
      {
        q: "Is it safe to drive with a squealing brake?",
        a: "Squealing usually means the pads are worn. Grinding means metal on metal, so stop driving and call us.",
      },
    ],
  },
  {
    slug: "ac-and-cooling",
    name: "AC and cooling",
    summary:
      "Air conditioning that cools properly and an engine that does not overheat.",
    symptoms: [
      "AC blows warm or weak air",
      "Musty smell from the vents",
      "Temperature gauge climbs in traffic",
      "Coolant level keeps dropping",
    ],
    includes: [
      "AC gas pressure and leak check",
      "Compressor, condenser and filter inspection",
      "Radiator, hoses and coolant check",
      "Gas refill or part replacement after approval",
    ],
    time: "3 hours to 1 day",
    from: 1299,
    faqs: [
      {
        q: "Why is my AC not cooling?",
        a: "The usual causes are low gas from a leak, a failing compressor or a blocked condenser. We find which one before quoting.",
      },
    ],
  },
  {
    slug: "electrical-and-battery",
    name: "Electrical and battery",
    summary:
      "Starting problems, dead batteries, lights and electronics that act up.",
    symptoms: [
      "Car is slow to start or clicks and does not start",
      "Battery drains overnight",
      "Lights flicker or windows stop working",
      "Battery warning light on",
    ],
    includes: [
      "Battery, alternator and starter test",
      "Wiring and fuse inspection",
      "Battery replacement with disposal of the old one",
      "Written quote before any repair",
    ],
    time: "1 to 4 hours for most jobs",
    from: 499,
    faqs: [
      {
        q: "How long does a car battery last?",
        a: "Most last 3 to 5 years. Short trips, heat and extra electronics shorten that.",
      },
    ],
  },
  {
    slug: "denting-and-painting",
    name: "Denting, painting and detailing",
    summary:
      "Bodywork and finish: dents, scratches, repainting and a proper clean inside and out.",
    symptoms: [
      "Dents or scratches after a minor accident",
      "Faded or peeling paint",
      "Interior needs a deep clean",
    ],
    includes: [
      "Panel assessment and colour matching",
      "Dent removal and repainting",
      "Polish and protective coating",
      "Interior and exterior detailing",
    ],
    time: "2 to 5 days for paintwork",
    from: 2999,
    faqs: [
      {
        q: "Can you match my car's paint exactly?",
        a: "We colour-match from your paint code and blend into neighbouring panels so the repair is not visible.",
      },
    ],
  },

];

export const getService = (slug: string) =>
  services.find((s) => s.slug === slug);

export const processSteps = [
  {
    title: "Drop off",
    body: "Bring the car in or book a pickup. Tell us what you notice and when it started.",
  },
  {
    title: "Diagnose",
    body: "A technician inspects and tests the car, then shows you what they found.",
  },
  {
    title: "Approve the quote",
    body: "You get a written quote with parts and labour split out. Nothing starts until you say yes.",
  },
  {
    title: "Repair",
    body: "We fix what you approved. If we find something new, we ask before adding it.",
  },
  {
    title: "Pick up",
    body: "We road-test the car, explain the work and hand back any old parts you want.",
  },
];

export const symptomChoices = [
  "Won't start",
  "Strange noise",
  "Brakes feel wrong",
  "Warning light on",
  "AC not cooling",
  "Routine service",
];

export const generalFaqs: { q: string; a: string }[] = [
  {
    q: "Will I get a quote before work starts?",
    a: "Yes, always. The quote lists parts and labour separately. We only start once you approve it.",
  },
  {
    q: "What if you find another problem during the repair?",
    a: "We stop, show you the problem and send an updated quote. We never add work without your approval.",
  },
  {
    q: "Can I see the old parts?",
    a: "Yes. Ask when you drop the car off and we will keep the replaced parts for you.",
  },
  {
    q: "Do you work on all car brands?",
    a: "We service most makes and models. Tell us your car in the booking form and we confirm before you come in.",
  },
  {
    q: "How long will my car be with you?",
    a: "A routine service usually takes half a day. Larger repairs take longer and we tell you the timeline in the quote.",
  },
  {
    q: "Do you offer pickup and drop?",
    a: "Ask us when you book. If it is available for your area we confirm the details by call or WhatsApp.",
  },
  {
    q: "How do I pay?",
    a: "Pay when you collect the car. Ask us which payment methods we accept.",
  },
];
