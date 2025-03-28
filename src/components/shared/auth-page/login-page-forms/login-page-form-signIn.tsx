import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { LoginApgeFormSigInTitle } from "./login-page-form-signIn/login-apge-form-sigIn-title";
import { FormInput } from "../../reuses-components/form-input/form-input";
import { formLoginSchema, TFormLoginValues } from "../schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { userStoreZustand } from "@/src/store/user-store";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";

interface Props {
  className?: string;
}

export const LoginPageFormSignIN: React.FC<Props> = ({ className }) => {
  const userStore = userStoreZustand((state) => state);
  const navigate = useNavigate();

  const form = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      userStore.fetchUserData(data);
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(styles.form, className)}
      >
        <LoginApgeFormSigInTitle className={styles.titleMargin} />
        <div className={styles.form}>
          <FormInput
            autoComplete="off"
            type="text"
            placeholder="Ваш E-Mail"
            name="email"
            label="E-Mail"
          />
          <FormInput placeholder="Ваш пароль" name="password" label="Пароль" />
          <button type="submit" className={styles.submitButton}>
            Войти
          </button>
        </div>
      </form>
    </FormProvider>
  );
};