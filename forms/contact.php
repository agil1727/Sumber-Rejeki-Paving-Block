<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__ . '/../vendor/autoload.php';


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name'] ?? '');
    $email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    $message = htmlspecialchars($_POST['message'] ?? '');

    if (!$name || !$email || empty($message)) {
        echo "Semua kolom harus diisi dengan benar!";
        exit;
    }

    $mail = new PHPMailer(true);
    try {
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'sumber.rejeki.281720@gmail.com'; // Ganti dengan email Anda
        $mail->Password   = 'ktzx nskw hqtn tefh'; // Ganti dengan App Password Gmail
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Set email pengirim (HARUS email Anda)
        $mail->setFrom('sumber.rejeki.281720@gmail.com', 'Sumber Rejeki Contact Form');
        // Set email tujuan
        $mail->addAddress('agilbonekwani1927@gmail.com'); // Ganti dengan email penerima

        // Set email format ke HTML
        $mail->isHTML(true);
        $mail->Subject = 'Pesan Baru dari Contact Form';
        $mail->Body    = "
            <h2>Pesan Baru dari Website</h2>
            <p><strong>Nama:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Pesan:</strong><br>$message</p>
        ";

        // Kirim email
        if ($mail->send()) {
            echo 'Pesan berhasil dikirim! Kami akan segera menghubungi Anda.';
        } else {
            echo 'Maaf, pesan gagal dikirim. Silakan coba lagi.';
        }
    } catch (Exception $e) {
        echo "Maaf, terjadi kesalahan. Error: {$mail->ErrorInfo}";
    }
}
?>
