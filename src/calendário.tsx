import { useState } from "react";
import type { Dayjs } from "dayjs";
import { LocalizationProvider, DateCalendar, PickerDay } from "@mui/x-date-pickers";
import type { PickerDayProps } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import HomeIcon from "@mui/icons-material/Home";
import BusinessIcon from "@mui/icons-material/Business";

type TipoDia = "home" | "presencial" | null;

export default function CalendarioCustomizado() {
  const [dias, setDias] = useState<Record<string, TipoDia>>({});

  const handleClick = (date: Dayjs) => {
    const key = date.format("YYYY-MM-DD");

    setDias((prev) => {
      const atual = prev[key];

      // alterna estado
      const novo =
        atual === null
          ? "home"
          : atual === "home"
          ? "presencial"
          : null;

      return { ...prev, [key]: novo };
    });
  };

  const renderDia = (props: PickerDayProps) => {
    const key = props.day.format("YYYY-MM-DD");
    const tipo = dias[key];

    return (
      <div style={{ position: "relative" }}>
        <PickerDay {...props} onClick={() => handleClick(props.day)} />

        {tipo === "home" && (
          <HomeIcon
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              fontSize: 16,
            }}
          />
        )}

        {tipo === "presencial" && (
          <BusinessIcon
            style={{
              position: "absolute",
              bottom: 2,
              right: 2,
              fontSize: 16,
            }}
          />
        )}
      </div>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        slots={{ day: renderDia }}
      />
    </LocalizationProvider>
  );
}