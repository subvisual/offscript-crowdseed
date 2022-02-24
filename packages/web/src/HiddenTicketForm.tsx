import { FC } from "react";

export const HiddenTicketForm: FC = () => {
  return (
    <form
      name="ticket-sales"
      method="POST"
      data-netlify="true"
      style={{ display: "none" }}
    >
      <input type="text" name="email" />
      <input type="text" name="signature" />
      <input type="text" name="address" />
    </form>
  );
};
