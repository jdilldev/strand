export const getBrandDisplayName = (brand: string) => {
  switch (brand) {
    case "dmc":
      return "DMC";
    case "anchor":
      return "Anchor";
    case "classicColorworks":
      return "Classic Colorworks";
    case "weeksDyeWorks":
      return "Weeks Dye Works";
    default:
      return brand;
  }
};
