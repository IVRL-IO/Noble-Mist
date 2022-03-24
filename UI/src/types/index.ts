
function titleCase(media: MediaProvider) {
  return media.charAt(0).toUpperCase() + media.toString().slice(1);
}

export { titleCase };
export { MediaProvider } from "./enums/mediaProvider";
