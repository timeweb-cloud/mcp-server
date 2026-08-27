export type Finances = {
  balance: number;
  currency: string;
  discount_end_date_at: string | null;
  discount_percent: number;
  hourly_cost: number;
  hourly_fee: number;
  monthly_cost: number;
  monthly_fee: number;
  total_paid: number;
  hours_left: number | null;
  autopay_card_info: string | null;
};

export type AccountStatus = {
  is_blocked: boolean;
  is_permanent_blocked: boolean;
  is_send_bill_letters: boolean;
  last_password_changed_at: string | null;
  bonus_balance?: number;
};
