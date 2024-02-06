import { AppButton } from "@/shared/ui/Button";

export const ErrorPage = () => {

    const reloadPage = () => {
        window.location.reload();
    };

    return (
        <div>
            <p>Произошла непредвиденная ошибка</p>
            <AppButton onClick={reloadPage}>Обновить страницу</AppButton>
        </div>
    );
};
