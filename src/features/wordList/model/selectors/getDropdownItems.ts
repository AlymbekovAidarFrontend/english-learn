export const getDropdownItems = ({ onSelect, id }: { id: number; onSelect: (id: Nullable<number>) => void; }) => {
    return [
        { content: 'Удалить', onClick: () => onSelect(id) },
        { content: 'Редактировать', onClick: () => {} },
    ];
};