export const userInfoFormat = (age: number, gender: string) => {
  const formatAge = age >= 10 ? `${age.toString().slice(0, 1)}0대` : "아동";
  const formatGender = gender === "M" ? "남성" : "여성";
  return formatAge + " | " + formatGender;
};

export const formatDate = (date: Date) => {
  const month = String(date?.getMonth() + 1).padStart(2, "0");
  const day = String(date?.getDate()).padStart(2, "0");
  return `${date?.getFullYear()}-${month}-${day}`;
};
