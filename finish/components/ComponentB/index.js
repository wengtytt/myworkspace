export default function ComponentA(props) {
    const title = "Sample Component B";

    return (
        <div
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1rem",
                background: rgb(56, 193, 252),
            }}
        >
            <span>{title}</span>
        </div>
    );
}
