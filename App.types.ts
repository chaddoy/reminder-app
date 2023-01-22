export type TReminder = {
  id?: string;
  name: string;
  hours: number;
  minutes: number;
  seconds: number;
  repeat: boolean;
  done: boolean;
  created: Date;
  identifier?: string;
};

export type TForm = {
  onClose?: () => void;
  onSave?: (reminder: TReminder) => void;
  onDelete?: (reminder: TReminder) => void;
  edit?: TReminder;
};

export type TReminderItem = {
  onPress?: (reminder: TReminder) => void;
  reminders: TReminder[];
};

export type TIcons = {
  status: 'repeat' | 'once' | 'done'
}
