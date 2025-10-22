import { Product, VariantChosen } from "./types";

export function findVariant(product: Product, variants: VariantChosen[]) {
  if (product) {
    const optionPos = variants.map(
      (selected) =>
        product.options.find((option) => option.name === selected.option)
          ?.position
    );

    const variantRes = product.variants.find((variant) => {
      const isVariantMatch = variants.every((selectedVariant, index) => {
        if (optionPos[index] == 1) {
          return variant.option1 == selectedVariant.value;
        } else if (optionPos[index] == 2) {
          return variant.option2 == selectedVariant.value;
        } else if (optionPos[index] == 3) {
          return variant.option3 == selectedVariant.value;
        } else {
          console.log("An error has happened: option position not recognized.");
          return false;
        }
      });
      return isVariantMatch;
    });
    return variantRes;
  }
}
