/**
 * Owner-supplied content. Both lists start empty on purpose:
 * only add real reviews (with the customer's permission) and real photos.
 */
export type Review = {
  name: string;
  /** e.g. "Brake service" */
  service?: string;
  text: string;
  /** 1 to 5 */
  rating?: number;
};

export const reviews: Review[] = [];

export type GalleryItem = {
  /** Path inside /public, e.g. "/gallery/brake-job.jpg" */
  src: string;
  alt: string;
  caption?: string;
};

export const gallery: GalleryItem[] = [
  {
    src: "/gallery/01-workshop-front.jpg",
    alt: "Multi Cars Service Point workshop exterior with vehicles in service bays",
    caption: "Multi Cars Service Point workshop exterior and bays",
  },
  {
    src: "/gallery/02-signboard.jpg",
    alt: "Multi Cars Service Point signboard showing contact numbers and services",
    caption: "Official Multi Cars Service Point signboard at Paliyath Valappu",
  },
  {
    src: "/gallery/03-service-bay-repair.jpg",
    alt: "Technician performing diagnostics and service under the hood",
    caption: "Car repair and maintenance work in progress",
  },
  {
    src: "/gallery/04-bodywork-painting.jpg",
    alt: "Vehicle undergoing bodywork repair and painting",
    caption: "Auto bodywork and paint preparation area",
  },
  {
    src: "/gallery/05-workshop-view-2.jpg",
    alt: "Workshop floor with multiple vehicles being serviced",
    caption: "Spacious multi-bay workshop floor",
  },
  {
    src: "/gallery/06-engine-work.jpg",
    alt: "Mechanical repairs and routine maintenance",
    caption: "Engine inspection and mechanical repairs",
  },
  {
    src: "/gallery/07-exterior-road.jpg",
    alt: "Road access to Multi Cars Service Point on Morazha Kannapuram Road",
    caption: "Roadside entrance on Morazha Kannapuram Road",
  },
  {
    src: "/gallery/08-finished-car.jpg",
    alt: "Completed car detailing and bodywork finish",
    caption: "Completed bodywork and paint detailing",
  },
  {
    src: "/gallery/09-workshop-bay-wide.jpg",
    alt: "Service bays equipped for cars of all brands",
    caption: "Service bays equipped for multi-brand car repairs",
  },
  {
    src: "/gallery/10-road-approach.jpg",
    alt: "Approach to Multi Cars Service Point from Paliyath Valappu",
    caption: "Convenient approach from Paliyath Valappu junction",
  },
];

export type TeamMember = {
  name: string;
  role: string;
  bio?: string;
};

export const team: TeamMember[] = [];
