<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $message = $_POST['message'] ?? '';

    if (empty($name) || empty($email) || empty($message)) {
        echo "Semua kolom harus diisi!";
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'sumber.rejeki.281720@gmail.com'; // Ganti dengan email kamu
        $mail->Password   = 'APP_PASSWORD_KAMU'; // Ganti dengan App Password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Set email pengirim
        $mail->setFrom($email, $name); // Email yang dikirimkan (dari form)
        // Set email tujuan
        $mail->addAddress('agilbonekwani1927@gmail.com'); // Email tujuan (Sumber Rejeki)

        // Set email format ke HTML
        $mail->isHTML(true);
        $mail->Subject = 'Pesan dari Formulir Kontak';
        // Isi pesan email
        $mail->Body    = "Nama: $name <br>Email: $email <br>Pesan: $message";

        // Kirim email
        if ($mail->send()) {
            echo 'Email berhasil dikirim.';
        } else {
            echo 'Gagal mengirim email.';
        }
    } catch (Exception $e) {
        echo "Gagal mengirim email. Error: {$mail->ErrorInfo}";
    }
}
?>
