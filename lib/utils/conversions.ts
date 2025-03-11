export const convertHeight = {
  cmToImperial: (cm: string) => {
    if (!cm) return { feet: "", inches: "" };

    const cmNum = Number.parseFloat(cm);
    if (isNaN(cmNum)) return { feet: "", inches: "" };

    const inches = cmNum / 2.54;
    const feet = Math.floor(inches / 12);
    const remainingInches = Math.round(inches % 12);

    return {
      feet: feet.toString(),
      inches: remainingInches.toString(),
    };
  },

  imperialToCm: (ft: string, inch: string) => {
    const feet = Number.parseFloat(ft || "0");
    const inches = Number.parseFloat(inch || "0");
    if (isNaN(feet) || isNaN(inches)) return "";

    const totalInches = feet * 12 + inches;
    const cm = Math.round(totalInches * 2.54);

    return cm.toString();
  },
};

export const convertWeight = {
  kgToLbs: (kg: string) => {
    if (!kg) return "";
    const kgNum = Number.parseFloat(kg);
    if (isNaN(kgNum)) return "";

    return Math.round(kgNum * 2.20462).toString();
  },

  lbsToKg: (lbs: string) => {
    if (!lbs) return "";
    const lbsNum = Number.parseFloat(lbs);
    if (isNaN(lbsNum)) return "";

    return Math.round(lbsNum / 2.20462).toString();
  },
};

export const calculateAge = (birthdate: string): string => {
  if (!birthdate) return "";

  const birthDate = new Date(birthdate);
  const today = new Date();

  let calculatedAge = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    calculatedAge--;
  }

  return calculatedAge.toString();
};
