var Titulo;
var Etiqueta;
var SelectTipo;
var Pagina;
var Dados;
var table;
var tbody;

var ListaDePessoas;
var PessoaAtual;
var URL = "https://projeto-devmedia.herokuapp.com/pessoas";


window.onload = function () {

    //VIEW BIND
    nome = document.getElementById("idNome");
    sobrenome = document.getElementById("idSobrenome");
    dataNascimento = document.getElementById("idDataNascimento");
    email = document.getElementById("idEmail");
    cep = document.getElementById("idCEP");
    cpf = document.getElementById("idCPF");
    estado = document.getElementById("idEstado");
    cidade = document.getElementById("idCidade");
    bairro = document.getElementById("idBairro");

    table = document.getElementById("myTable");
    tbody = table.getElementsByTagName("tbody")[0];

    var btnNovaPessoa = document.getElementById("btnNovaPessoa");
    btnNovaPessoa.addEventListener("click", function () {
        PessoaModal(null)
    });

    var btnSalvar = document.getElementById("btnSalvar");
    btnSalvar.addEventListener("click", function () {
        NovaPessoa()
    });

    CarregarPessoas();
    $("#idEmail").addClass("col-md-6 form-group has-success");


    Validar();

};


function PessoaModal(row) {

    $("#PessoaModal").modal('show');

    if (row != null) {


        var id = row.parentElement.parentElement.children[0].innerHTML;
        PessoaAtual = ListaDePessoas[id];

        if (!isEmpty(PessoaAtual.nome)) {
            nome.value = PessoaAtual.nome;
        }

        if (!isEmpty(PessoaAtual.sobrenome)) {
            sobrenome.value = PessoaAtual.sobrenome;
        }

        if (!isEmpty(PessoaAtual.data)) {
            dataNascimento.value = PessoaAtual.data;
        }

        if (!isEmpty(PessoaAtual.email)) {
            email.value = PessoaAtual.email;
        }

        if (!isEmpty(PessoaAtual.cep)) {
            cep.value = PessoaAtual.cep;
        }

        if (!isEmpty(PessoaAtual.cpf)) {
            cpf.value = PessoaAtual.cpf;
        }

        if (!isEmpty(PessoaAtual.estado)) {
            estado.value = PessoaAtual.estado;
        }

        if (!isEmpty(PessoaAtual.cidade)) {
            cidade.value = PessoaAtual.cidade;
        }

        if (!isEmpty(PessoaAtual.bairro)) {
            bairro.value = PessoaAtual.bairro;
        }


    } else {
        //reseta os valores
        PessoaAtual = null;
        nome.value = "";
        sobrenome.value = "";
        dataNascimento.value = "";
        email.value = "";
        cep.value = "";
        cpf.value = "";
        estado.value = "";
        cidade.value = "";
        bairro.value = "";

        $("#divEmail").removeClass('form-group has-success').addClass('form-group has-error');


    }


}


function CarregarPessoas() {

    ListaDePessoas = {};

    $("#myTable tbody tr").remove();

    axios.get(URL)
        .then(function (response) {

            var data = response.data;

            for (var i = 0; i < data.length; i++) {

                ListaDePessoas[data[i].id] = data[i];

                var row = document.createElement("tr");

                var tdCod = document.createElement("td");
                tdCod.innerHTML = data[i].id;
                tdCod.style.display = "none";

                var tdNome = document.createElement("td");
                tdNome.innerHTML = data[i].nome;

                var tdSobrenome = document.createElement("td");
                tdSobrenome.innerHTML = data[i].sobrenome;

                var tdDataNascimento = document.createElement("td");
                tdDataNascimento.innerHTML = data[i].data;

                var tdEmail = document.createElement("td");
                tdEmail.innerHTML = data[i].email;

                var tdCPF = document.createElement("td");
                tdCPF.innerHTML = data[i].cpf;

                var tdCEP = document.createElement("td");
                tdCEP.innerHTML = data[i].cep;

                var tdEstado = document.createElement("td");
                tdEstado.innerHTML = data[i].estado;

                var tdCidade = document.createElement("td");
                tdCidade.innerHTML = data[i].cidade;

                var tdBairro = document.createElement("td");
                tdBairro.innerHTML = data[i].bairro;


                var tdNBtn = document.createElement("td");
                tdNBtn.innerHTML = " <td align='center'><a class='btn btn-default' data-title='Edit' data-toggle='modal' data-target='#edit' onclick='PessoaModal(this)'>" +
                    "<em class='fa fa-pencil'></em></a> <a class='btn btn-danger' data-title='Delete' data-toggle='modal' onclick='RemoverPessoa(this)'>" +
                    "<em class='fa fa-trash'></em></a> </td>";


                row.appendChild(tdCod);
                row.appendChild(tdNome);
                row.appendChild(tdSobrenome);
                row.appendChild(tdDataNascimento);
                row.appendChild(tdEmail);
                row.appendChild(tdCPF);
                row.appendChild(tdCEP);
                row.appendChild(tdEstado);
                row.appendChild(tdCidade);
                row.appendChild(tdBairro);

                row.appendChild(tdNBtn);
                tbody.appendChild(row);
            }

        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });


}


function NovaPessoa() {


    if (!PessoaAtual) {

        var NovaPessoa = {};
        NovaPessoa.nome = nome.value;
        NovaPessoa.sobrenome = sobrenome.value;
        NovaPessoa.email = email.value;
        NovaPessoa.data = dataNascimento.value;
        NovaPessoa.cep = cep.value;
        NovaPessoa.cpf = cpf.value;
        NovaPessoa.estado = estado.value;
        NovaPessoa.cidade = cidade.value;
        NovaPessoa.bairro = bairro.value;

        if (!ValidarEmail(NovaPessoa.email)) {
            return;
        }

        axios.put(URL, NovaPessoa)
            .then(function (response) {
                CarregarPessoas();
            })
            .catch(function (error) {
                console.log(error);
            });


    }
    else {


        PessoaAtual.nome = nome.value;
        PessoaAtual.sobrenome = sobrenome.value;
        PessoaAtual.email = email.value;
        PessoaAtual.data = dataNascimento.value;
        PessoaAtual.cep = cep.value;
        PessoaAtual.cpf = cpf.value;
        PessoaAtual.estado = estado.value;
        PessoaAtual.cidade = cidade.value;
        PessoaAtual.bairro = bairro.value;

        if (!ValidarEmail(PessoaAtual.email)) {
            return;
        }

        axios.post(URL, PessoaAtual)
            .then(function (response) {
                CarregarPessoas();
            })
            .catch(function (error) {
                console.log(error);
            });


    }

    $("#PessoaModal").modal('hide');
}

function RemoverPessoa(row) {
    var id = row.parentElement.parentElement.children[0].innerHTML;

    axios.delete(URL + "/" + id)
        .then(function (response) {
            CarregarPessoas();
        })
        .catch(function (error) {
            console.log(error);
        });


}


function Validar() {
    $('#idEmail').on('input', function (e) {
        if (ValidarEmail(e.target.value)) {
            $("#divEmail").removeClass('form-group has-error').addClass('form-group has-success');
        } else {
            $("#divEmail").removeClass('form-group has-success').addClass('form-group has-error');
        }
    });
}

function isEmpty(str) {
    return (!str || 0 === str.length);
}

function ValidarEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}




	







