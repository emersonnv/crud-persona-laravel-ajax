<!DOCTYPE html>
<html lang="en">

<head>
    <title>Persons System</title>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="/css/bootstrap.min.css">
    <link rel="stylesheet" href="/css/all.min.css">
    <link rel="stylesheet" href="/css/style.css">
</head>

<body>
    <div class="container overflow-auto py-3">
        <form id="formPerson" class="p-2" action="{{ route('persons.store') }}" method="POST">
            <input id="inputId" type="hidden">

            <h1 class="text-center">Persons System</h1>
            <label for="inputName">Person Name:</label>
            <input id="inputName" type="text" class="form-control my-1" value="Emerson">
            <div id="alertName" class="d-none alert alert-danger py-2 mb-2">This Name Is Not Valid<br>Example: Emerson
            </div>

            <label for="inputLastName">Person LastName:</label>
            <input id="inputLastName" type="text" class="form-control my-1" value="Nahuinlla Velasquez">
            <div id="alertLastName" class="d-none alert alert-danger py-2 mb-2">This LastName Is Not Valid<br>Example:
                Nahuinlla Velasquez</div>

            <label for="inputDoc">Person Doc:</label>
            <input id="inputDoc" type="number" class="form-control my-1" value="12345678">
            <div id="alertDoc" class="d-none alert alert-danger py-2 mb-2">This Doc Is Not Valid<br>Example: 12345678
            </div>


            <div class="text-center w-100">
                <button id="btnAdd" class="btn mb-1 mb-sm-0 btn-success text-white" type="button">Add Person</button>
                <button id="btnClear" class="btn mb-1 mb-sm-0 btn-outline-success" type="button">Clear Form</button>
            </div>
            <br>
            <div id="alertSuccess" class="alert alert-success" role="alert" hidden>
                This is a success alert—check it out!
            </div>
            <div id="alertError" class="alert alert-danger" role="alert" hidden>
                This is a success alert—check it out!
            </div>

            <input id="inputSearch" class="form-control my-4" placeholder="Search By Name..." type="search">
        </form>
        <table class="table table-striped text-center p-2">
            <thead>
                <th>Index</th>
                <th>Name</th>
                <th>LastName</th>
                <th>Doc</th>
                <th>Actions</th>
            </thead>
            <tbody id="tableBody"></tbody>
        </table>
    </div>
    <script src="/js/index.js"></script>
</body>

</html>
