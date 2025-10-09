export type ClientOrder = {
  id: number; // из сервера
  createdAt?: string; // из сервера
  name: string;
  phone: string;
  passengers: number;
  childSeat: boolean;
  comment?: string | null;
  from: string;
  to: string;
  date: string;
  time: string;
  roundTrip?: boolean;
  returnDate?: string | null;
  returnTime?: string | null;
};

const KEY = "myOrders";

export function getOrders(): ClientOrder[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as ClientOrder[]) : [];
  } catch {
    return [];
  }
}

export function addOrder(o: ClientOrder) {
  const list = getOrders();
  list.unshift(o); // новый — в начало
  const trimmed = list.slice(0, 10); // максимум 10
  localStorage.setItem(KEY, JSON.stringify(trimmed));
}

export function clearOrders() {
  localStorage.removeItem(KEY);
}
