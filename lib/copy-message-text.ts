import toast from "react-hot-toast";

export const copyMessageText = (text: string) => {
    navigator.clipboard
        .writeText(text)
        .then(() => {
            toast.success("Текст скопирован", {
                position: "bottom-right",
            });
        })
        .catch(() => {
            toast.error("Не удалось скопировать текст.", {
                position: "bottom-right",
            });
        });

}