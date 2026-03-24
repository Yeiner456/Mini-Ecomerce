export default function DescuentoCheckbox({ checked, onChange }) {
    return (
        <label className="descuento-checkbox">
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
            />
            Solo con descuento superior a 10%
        </label>
    )
}