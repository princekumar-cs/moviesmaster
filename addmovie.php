<?php
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $title = $_POST['title'];
    $year = $_POST['year'];
    $desc = $_POST['desc'];
    $download = $_POST['download'];

    // Handle poster upload
    if(isset($_FILES['thumb']) && $_FILES['thumb']['error'] === 0){
        $uploadDir = 'assets/posters/';
        if(!is_dir($uploadDir)) mkdir($uploadDir, 0755, true);

        $filename = time() . '_' . basename($_FILES['thumb']['name']);
        $targetFile = $uploadDir . $filename;

        if(move_uploaded_file($_FILES['thumb']['tmp_name'], $targetFile)){
            $thumbPath = $targetFile;
        } else {
            die('Failed to upload poster image.');
        }
    } else {
        die('Poster image is required.');
    }

    // Read existing movies.json
    $jsonFile = 'movies.json';
    $movies = [];
    if(file_exists($jsonFile)){
        $movies = json_decode(file_get_contents($jsonFile), true);
    }

    // Generate unique ID
    $ids = array_column($movies,'id');
    $newId = $ids ? max($ids)+1 : 1;

    // New movie
    $newMovie = [
        'id' => $newId,
        'title' => $title,
        'year' => $year,
        'desc' => $desc,
        'thumb' => $thumbPath,
        'download' => $download
    ];

    $movies[] = $newMovie;

    // Save back to movies.json
    if(file_put_contents($jsonFile, json_encode($movies, JSON_PRETTY_PRINT))){
        echo "<p>Movie added successfully!</p><p><a href='index.html'>Go to Homepage</a></p>";
    } else {
        echo "Failed to save movie.";
    }
} else {
    echo "Invalid request.";
}
?>
