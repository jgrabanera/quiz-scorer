export default function InputError({ message, className = '', ...props }) {
    return message ? (
        <p
            {...props}
            className={'text-base roboto-thin text-red-600 ' + className}
        >
            {message}
        </p>
    ) : null;
}
