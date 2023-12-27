export interface ApplyFormProps {
  isChecked: boolean;
  setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
  setContent: React.Dispatch<React.SetStateAction<string>>;
}

export interface ApplyBtnProps {
  isChecked: boolean;
  content: string;
}
