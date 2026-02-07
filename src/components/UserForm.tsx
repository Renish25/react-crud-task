import {
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  Radio,
  RadioGroup,
  FormLabel,
  FormControl,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userFormConfig, type UserFormField } from "../config/userFormConfig";
import type { User } from "../types/user";
import { buildUserSchema } from "../schemas/buildUserSchema";

interface Props {
  onSubmit: (data: User) => void;
  defaultValues?: User;
}

export default function UserForm({ onSubmit, defaultValues }: Props) {
  const schema = buildUserSchema();
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<User>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const renderField = (field: UserFormField) => {
    switch (field.input) {
      case "text":
      case "number":
      case "password":
        return (
          <TextField
            {...register(field.name as keyof User)}
            key={field.name}
            label={field.label}
            type={field.type}
            error={!!errors[field.name as keyof User]}
            helperText={errors[field.name as keyof User]?.message}
            inputProps={field.inputProps}
            fullWidth
          />
        );

      case "textArea":
        return (
          <TextField
            {...register(field.name as keyof User)}
            key={field.name}
            label={field.label}
            multiline
            minRows={3}
            error={!!errors[field.name as keyof User]}
            helperText={errors[field.name as keyof User]?.message}
            fullWidth
          />
        );

      case "date":
        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: ctrl }) => (
              <TextField
                label={field.label}
                type="date"
                value={ctrl.value || ""}
                onChange={ctrl.onChange}
                InputLabelProps={{ shrink: true }}
                error={!!errors[field.name]}
                helperText={errors[field.name]?.message?.toString()}
                fullWidth
              />
            )}
          />
        );

      case "checkbox":
        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            render={({ field: ctrl }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    checked={!!ctrl.value}
                    onChange={(e) => ctrl.onChange(e.target.checked)}
                  />
                }
                label={field.label}
              />
            )}
          />
        );

      case "radio":
        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: ctrl }) => (
              <FormControl error={!!errors[field.name]}>
                <FormLabel>{field.label}</FormLabel>

                <RadioGroup
                  row
                  value={ctrl.value || ""}
                  onChange={(e) => ctrl.onChange(e.target.value)}
                >
                  {field.options?.map((opt) => (
                    <FormControlLabel
                      key={opt.value}
                      value={opt.value}
                      control={<Radio />}
                      label={opt.label}
                    />
                  ))}
                </RadioGroup>

                {errors[field.name]?.message && (
                  <Typography color="error" variant="caption">
                    {String(errors[field.name]?.message)}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        );

      case "select":
        return (
          <Controller
            key={field.name}
            name={field.name}
            control={control}
            rules={{ required: field.required }}
            render={({ field: ctrl }) => (
              <FormControl
                fullWidth
                error={!!errors[field.name]}
              >
                <InputLabel>{field.label}</InputLabel>

                <Select
                  value={ctrl.value ?? ""}
                  label={field.label}
                  onChange={ctrl.onChange}
                >
                  {field.options?.map((opt) => (
                    <MenuItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </MenuItem>
                  ))}
                </Select>

                {errors[field.name]?.message && (
                  <Typography color="error" variant="caption">
                    {String(errors[field.name]?.message)}
                  </Typography>
                )}
              </FormControl>
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={2}>
        {userFormConfig.map(renderField)}

        <Button type="submit" variant="contained">
          Save
        </Button>
      </Stack>
    </form>
  );
}