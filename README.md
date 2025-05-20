# Projeto Django - Formativa - Backend

Este projeto Django está estruturado com os diretórios principais:
- `Backend/app/`: Contém a aplicação Django.
- `Backend/project/`: Contém o projeto Django principal (`settings.py`, `urls.py`, etc).
- `Backend/requirements.txt`: Lista de dependências do projeto.
- `Backend/doc.txt`: Contém o link da documentação da API (Postman).

## Pré-requisitos

- Python 3.8+
- MySQL Server (rodando na porta padrão 3306)
- `virtualenv` instalado globalmente (opcional, mas recomendado)

---

## 1. Clonar o repositório

```bash
git clone <url-do-seu-repositorio>
cd Backend
```

## 2. Criar o ambiente virtual

```bash
python -m venv env
env\Scripts\activate
```

> No Linux ou macOS:
> ```bash
> source env/bin/activate
> ```

## 3. Instalar as dependências

Com o ambiente virtual ativado, execute:

```bash
pip install -r requirements.txt
```

Se adicionar novas bibliotecas no futuro, atualize o `requirements.txt` com:

```bash
pip freeze > requirements.txt
```

---

## 4. Configure seu banco de dados no `project/settings.py`

Crie o banco de dados no seu SGBD (MySQL) com o nome `formativa`. Você pode fazer isso via terminal MySQL:

```sql
CREATE DATABASE formativa;
```

Em seguida, abra o arquivo `Backend/project/settings.py` e configure a seção `DATABASES` da seguinte forma:

```python
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'formativa',
        'USER': 'root',
        'PASSWORD': 'senai',
        'HOST': 'localhost',
        'PORT': '3306',
    }
}
```

> **Importante:** Certifique-se de que o serviço do MySQL está ativo e que as credenciais fornecidas estão corretas.

> **Dica:** Para facilitar a manutenção e segurança, considere utilizar variáveis de ambiente para armazenar as credenciais de acesso ao banco.

---

## 5. Aplicar as migrações

Com o ambiente virtual ativado e o banco configurado, execute:

```bash
python manage.py makemigrations
python manage.py migrate
```

---

## 6. Rodar o servidor de desenvolvimento

```bash
python manage.py runserver
```

Acesse o sistema em: [http://localhost:8000](http://localhost:8000)

---

## 7. Criar superusuário (opcional)

Para acessar o painel administrativo do Django:

```bash
python manage.py createsuperuser
```

---

## Estrutura do Projeto

```
Backend/
├── app/                # Aplicação Django
├── project/            # Configurações principais (settings.py, urls.py, etc)
├── manage.py           # Interface de gerenciamento Django
├── requirements.txt    # Arquivo de dependências
└── env/                # Ambiente virtual (não versionado)
```

---





