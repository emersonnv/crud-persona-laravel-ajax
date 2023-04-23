<!DOCTYPE html>
<html lang="en">

<head>
    <title>Calculator</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <div class="container overflow-auto py-3">
        <form id="formCalculator" class="p-2" action="{{ route('calculator.sum') }}" method="POST">

            <h1 class="text-center">Calcualtor - Sum</h1>
            <label for="inputNumberA">Number A:</label>
            <input id="inputNumberA" type="number" class="form-control my-1" value="5">

            <label for="inputNumberB">Number B:</label>
            <input id="inputNumberB" type="number" class="form-control my-1" value="3">

            <div class="text-center w-100">
                <button id="btnSum" class="btn mb-1 mb-sm-0 btn-success text-white" type="button">Sum</button>
                <button id="btnClear" class="btn mb-1 mb-sm-0 btn-outline-success" type="button">Clear Form</button>
            </div>
            <br>

            <div id="alertSuccess" class="alert alert-success" role="alert" hidden>
                This is a success alert—check it out!
            </div>
            <div id="alertError" class="alert alert-danger" role="alert" hidden>
                This is a success alert—check it out!
            </div>

            
            <label for="inputResult">Result:</label>
            <input id="inputResult" type="number" class="form-control my-1" value="">
        </form>
    </div>
    <script src="/js/calculator.js"></script>
</body>

</html>
