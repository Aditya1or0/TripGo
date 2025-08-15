import facebook_icon from "./facebook_icon.svg";
import instagram_icon from "./instagram_icon.svg";
import twitter_icon from "./twitter_icon.svg";
import earth from "./earth.png";
import headerimg from "./headerimg.png";
import logo from "./logo.png";

import { Compass, MapPin, UsersRound } from "lucide-react";
import user from "./profile_icon.png";

export const assets = {
  facebook_icon,
  instagram_icon,
  twitter_icon,
  earth,
  headerimg,
  user,
  logo,
};

export const stepsData = [
  {
    title: "Location",
    description:
      "Where are you going? We'll find the perfect destination for your trip.",
    icon: MapPin,
  },
  {
    title: "Distance",
    description:
      "Distance from your location. Choose the perfect distance for your trip.",
    icon: Compass,
  },
  {
    title: "Max People",
    description:
      "Max people. Choose the perfect number of people for your trip.",
    icon: UsersRound,
  },
];
