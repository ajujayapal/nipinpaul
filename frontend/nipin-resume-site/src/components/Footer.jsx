export default function Footer() {
    const today = new Date();
    const currentYear = today.getFullYear()
    return (
        <div className="footerContent">
            <p>&copy; {currentYear} Nipin Paul. All rights reserved.</p>
        </div>
    )
}