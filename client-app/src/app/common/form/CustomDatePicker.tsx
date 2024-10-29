import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, { DatePickerProps }  from "react-datepicker";


export default function CustomDatePicker(props: Partial<DatePickerProps>) {
  const [field, meta, helpers] = useField(props.name!);
  return (
    <Form.Field error={meta.touched && !!meta.error}>
      <DatePicker
        {...field}
        showTimeSelect
        selected={(field.value && new Date(field.value)) || null}
        onChange={(date: Date | null) => {
          helpers.setValue(date); // 設置選擇的日期
        }} // 修改這裡以符合類型要求
      />
      {meta.touched && meta.error ? (
        <Label basic color="red">
          {meta.error}
        </Label>
      ) : null}
    </Form.Field>
  );
}
