Search.setIndex({"docnames": ["developer/explanations/architecture", "developer/explanations/decisions", "developer/explanations/decisions/0001-record-architecture-decisions", "developer/explanations/decisions/0002-no-queues", "developer/explanations/decisions/0003-api-case", "developer/explanations/events", "developer/explanations/lifecycle", "developer/explanations/type_validators", "developer/how-to/build-docs", "developer/how-to/contribute", "developer/how-to/lint", "developer/how-to/make-release", "developer/how-to/run-tests", "developer/how-to/static-analysis", "developer/how-to/update-tools", "developer/index", "developer/reference/standards", "developer/tutorials/dev-install", "developer/tutorials/dev-run", "genindex", "index", "user/explanations/docs-structure", "user/how-to/add-plans-and-devices", "user/how-to/configure-app", "user/how-to/run-cli", "user/how-to/run-container", "user/index", "user/reference/api", "user/reference/cli", "user/reference/messaging-spec", "user/reference/rest-spec", "user/tutorials/installation", "user/tutorials/quickstart"], "filenames": ["developer/explanations/architecture.rst", "developer/explanations/decisions.rst", "developer/explanations/decisions/0001-record-architecture-decisions.rst", "developer/explanations/decisions/0002-no-queues.rst", "developer/explanations/decisions/0003-api-case.rst", "developer/explanations/events.rst", "developer/explanations/lifecycle.rst", "developer/explanations/type_validators.rst", "developer/how-to/build-docs.rst", "developer/how-to/contribute.rst", "developer/how-to/lint.rst", "developer/how-to/make-release.rst", "developer/how-to/run-tests.rst", "developer/how-to/static-analysis.rst", "developer/how-to/update-tools.rst", "developer/index.rst", "developer/reference/standards.rst", "developer/tutorials/dev-install.rst", "developer/tutorials/dev-run.rst", "genindex.rst", "index.rst", "user/explanations/docs-structure.rst", "user/how-to/add-plans-and-devices.rst", "user/how-to/configure-app.rst", "user/how-to/run-cli.rst", "user/how-to/run-container.rst", "user/index.rst", "user/reference/api.rst", "user/reference/cli.rst", "user/reference/messaging-spec.rst", "user/reference/rest-spec.rst", "user/tutorials/installation.rst", "user/tutorials/quickstart.rst"], "titles": ["Architecture", "Architectural Decision Records", "1. Record architecture decisions", "2. No Queues", "2. API Model Case", "Events Emitted by the Worker", "Lifecycle of a Plan", "Type Validators", "Build the docs using sphinx", "Contributing to the project", "Run linting using pre-commit", "Make a release", "Run the tests using pytest", "Run static analysis using mypy", "Update the tools", "Developer Guide", "Standards", "Developer install", "Run/Debug in a Developer Environment", "API Index", "blueapi", "About the documentation", "Add Plans and Devices to your Blueapi Environment", "Configure the application", "Control the Worker via the CLI", "Run in a container", "User Guide", "API", "Command-Line Interface", "Messaging Specification", "REST Specification", "Installation", "Quickstart Guide"], "terms": {"blueapi": [0, 5, 6, 7, 17, 18, 23, 24, 25, 26, 29, 30, 31, 32], "perform": 0, "number": [0, 5, 6, 9, 11, 25, 27, 29], "task": [0, 3, 15, 28, 29, 30], "manag": [0, 12], "blueski": [0, 5, 6, 7, 20, 22, 29, 32], "runengin": [0, 5, 6], "give": [0, 5], "instruct": [0, 17, 18], "handl": [0, 5, 9, 10], "its": [0, 6, 22, 25, 29, 30, 31], "error": [0, 3, 5, 6, 12, 24, 29, 30], "tradition": [0, 5], "thi": [0, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 14, 16, 17, 20, 21, 22, 23, 24, 27, 29, 30, 31], "job": [0, 20], "ha": [0, 5, 7, 11, 12, 14, 30, 31, 32], "been": [0, 31], "done": [0, 12, 13, 29], "human": [0, 5, 29], "an": [0, 3, 5, 6, 7, 8, 10, 12, 14, 20, 22, 23, 29], "ipython": [0, 5], "termin": [0, 5, 17, 31, 32], "so": [0, 4, 5, 7, 12, 17, 20, 31, 32], "requir": [0, 6, 12, 17, 20, 21, 22, 28, 29, 31, 32], "autom": [0, 5], "maintain": [0, 12], "registri": [0, 6, 25], "plan": [0, 4, 5, 7, 15, 20, 26, 29, 30, 32], "devic": [0, 6, 7, 20, 24, 26, 29, 30, 32], "In": [0, 3, 5, 6, 22, 24], "aforement": 0, "case": [0, 1, 5, 7, 17, 22], "would": [0, 22], "have": [0, 7, 9, 10, 12, 15, 17, 18, 22, 24, 32], "just": [0, 5, 10, 22], "global": [0, 6], "variabl": [0, 6, 12], "commun": [0, 12], "outsid": [0, 5], "world": 0, "accept": [0, 2, 3, 4, 28, 30], "run": [0, 3, 5, 6, 8, 9, 14, 15, 16, 17, 20, 26, 29, 30], "provid": [0, 14, 29], "updat": [0, 15, 28, 30], "progress": [0, 29], "etc": [0, 5, 29], "These": [0, 5, 7, 17], "respons": [0, 3, 29, 30], "ar": [0, 3, 5, 6, 7, 8, 9, 12, 16, 18, 21, 22, 23, 24, 25, 30], "kept": [0, 3], "separ": 0, "codebas": 0, "ensur": [0, 12, 18], "clean": 0, "main": [0, 11, 20, 25], "hold": [0, 3, 6], "well": [0, 6, 10, 29], "helper": 0, "method": [0, 7], "regist": [0, 6], "en": 0, "mass": 0, "from": [0, 2, 4, 5, 6, 7, 8, 15, 16, 18, 20, 22, 23, 24, 25, 26, 29, 31, 32], "normal": 0, "python": [0, 4, 11, 14, 17, 22], "modul": [0, 6, 14, 20, 22], "wrap": [0, 20], "request": [0, 3, 7, 9, 14, 29, 30], "includ": [0, 4, 5, 6, 8, 26], "name": [0, 4, 5, 6, 7, 12, 22, 28, 29, 30], "dictionari": [0, 7], "paramet": [0, 4, 6, 7, 24, 28, 30], "pass": [0, 6, 7, 23, 24, 30], "valid": [0, 15, 30], "against": [0, 6, 7, 12, 32], "known": [0, 7, 29], "expect": [0, 7, 29], "ani": [0, 3, 4, 6, 7, 8, 9, 10, 14, 22, 23, 28, 29, 30, 31], "api": [0, 1, 3, 8, 16, 20, 22, 26, 28, 29], "layer": 0, "refer": [0, 6, 7, 21, 24, 27, 28, 32], "can": [0, 3, 5, 6, 7, 8, 9, 10, 12, 13, 17, 18, 20, 22, 23, 24, 29, 30, 31, 32], "interrog": 0, "messag": [0, 5, 6, 24, 26], "reciev": [0, 29], "bu": [0, 6, 29], "It": [0, 6, 12, 13, 24, 31, 32], "also": [0, 5, 6, 7, 8, 9, 12, 15, 20, 24, 26, 31, 32], "forward": [0, 12, 24], "variou": [0, 7, 29], "event": [0, 6, 15, 29, 32], "gener": [0, 6, 7, 11, 14, 20, 22, 28, 29], "topic": [0, 21], "we": [1, 2, 3, 4, 5, 9], "major": 1, "adr": [1, 2], "describ": [1, 2, 29], "michael": [1, 2], "nygard": [1, 2], "below": [1, 5, 22], "i": [1, 3, 4, 5, 6, 7, 9, 10, 12, 13, 14, 15, 16, 21, 22, 23, 24, 26, 27, 29, 30, 31], "list": [1, 6, 7, 12, 28, 29], "our": 1, "current": [1, 14, 28, 29, 30, 31], "1": [1, 6, 7, 16], "2": [1, 16, 20, 29], "No": 1, "queue": [1, 6, 29], "model": [1, 5, 6, 7, 29], "date": [2, 3, 4], "2022": 2, "02": 2, "18": 2, "need": [2, 18, 21, 22, 31], "made": [2, 22], "project": [2, 8, 12, 14, 15, 22], "us": [2, 5, 7, 15, 16, 17, 20, 22, 23, 25, 28, 31, 32], "see": [2, 5, 7, 8, 11, 22], "": [2, 5, 6, 7, 20], "articl": 2, "link": [2, 15, 26], "abov": [2, 10, 22, 32], "To": [2, 11, 14, 17, 23, 25, 32], "creat": [2, 7, 11, 22, 30], "new": [2, 7, 9, 11, 17, 22, 26], "copi": 2, "past": 2, "exist": [2, 6, 9, 23, 31], "ones": [2, 4], "2023": [3, 4], "05": [3, 4], "22": 3, "ask": [3, 5, 9], "whether": [3, 4, 5, 29], "servic": [3, 6, 18, 20, 29, 32], "should": [3, 4, 7, 9, 22, 24, 31, 32], "execut": [3, 28, 29], "The": [3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 18, 20, 21, 22, 24, 29, 30, 31, 32], "worker": [3, 6, 15, 26, 28, 29, 30], "one": [3, 9, 12, 21], "time": [3, 5, 6, 7, 9, 10, 24, 29], "return": [3, 6, 7, 16, 22, 29, 30], "while": [3, 6, 9], "anoth": 3, "differ": [3, 4, 5, 12, 21], "must": [3, 5, 7, 22, 24], "free": [3, 9, 22], "although": 3, "transact": 3, "permit": 3, "where": [3, 7, 13, 14, 20, 22, 23, 29], "server": [3, 20, 24, 30], "cach": 3, "23": 4, "consid": [4, 16], "kei": [4, 6], "json": [4, 6, 7, 10, 24, 29], "blob": 4, "snake_cas": 4, "camelcas": 4, "which": [4, 5, 6, 8, 14, 17, 22, 23, 24, 29, 30], "mai": [4, 6, 20, 30], "user": [4, 5, 6, 15, 20], "defin": [4, 7, 16, 22, 23, 29], "prioriti": 4, "confus": 4, "alia": 4, "field": 4, "most": [4, 9, 21], "code": [4, 5, 6, 8, 10, 17, 20, 30], "written": [4, 6], "pep8": 4, "enforc": 4, "mean": [4, 14, 22], "some": [4, 22], "add": [5, 20, 26], "top": 5, "sinc": [5, 29], "front": 5, "sometim": 5, "assum": [5, 12, 15, 18, 32], "intuit": 5, "behaviour": [5, 12], "replac": [5, 7], "fill": 5, "gap": 5, "base": [5, 8, 29], "engin": 5, "programat": 5, "data": [5, 6, 20, 29, 32], "conform": [5, 16], "meant": [5, 24], "other": [5, 6, 29, 30], "subscrib": [5, 29], "e": [5, 6, 7, 8, 10, 12, 13, 17, 22], "g": [5, 6, 7, 22], "databrok": 5, "decoupl": 5, "concern": 5, "start": [5, 6, 26, 29], "finish": [5, 6, 24], "paus": [5, 29, 30], "exampl": [5, 7, 16, 20, 22, 23], "sequenc": 5, "emiss": 5, "compar": 5, "complic": 5, "note": [5, 11, 22, 24, 26], "between": [5, 6, 14], "issu": [5, 13], "first": [5, 17, 22], "document": [5, 6, 8, 9, 15, 17, 26, 28, 29, 30], "similar": [5, 22], "stop": [5, 29, 30], "v": 5, "end": [5, 9, 29, 30], "thsse": 5, "typic": [5, 26], "setup": [5, 14, 17, 18, 32], "cleanup": 5, "produc": [5, 29], "arbitrari": [5, 24], "fine": 5, "becaus": [5, 7, 22], "when": [5, 6, 7, 9, 17, 29], "associ": [5, 29], "For": [5, 7, 12, 16, 20, 22], "introduc": 5, "set": [5, 7, 9, 10, 12, 16, 18, 22, 23, 30], "specif": [5, 26, 32], "pertain": 5, "state": [5, 6, 7, 29, 30], "At": [5, 6, 7], "mimimum": 5, "everi": 5, "complet": [5, 29, 32], "fail": [5, 6, 12, 28], "latter": 5, "inform": [5, 9, 21, 30], "about": [5, 26, 30, 32], "control": [5, 18, 20, 26, 29, 32], "verifi": 5, "realli": 5, "relat": [5, 29], "you": [5, 8, 9, 10, 11, 12, 13, 15, 17, 18, 22, 23, 24, 31, 32], "therefor": 5, "bundl": 5, "contain": [5, 9, 12, 16, 17, 20, 22, 24, 26, 32], "microsoft": 5, "playbook": 5, "activemq": [5, 12, 18], "depend": [5, 25, 31], "protocol": [5, 6, 7, 22, 29], "jm": 5, "jms_correlationid": 5, "stomp": [5, 12], "follow": [6, 9, 11, 16, 17, 18, 20, 22, 23, 30], "demonstr": 6, "exactli": 6, "what": [6, 9, 22, 29], "doe": [6, 9, 12, 22], "through": [6, 7, 9, 12, 17, 22, 30], "being": [6, 7, 29], "take": [6, 7, 17, 20], "type": [6, 13, 15, 16, 17, 20, 22, 23, 29, 31], "import": [6, 16, 20, 22], "map": [6, 22], "option": [6, 11, 23, 28], "union": 6, "bp": [6, 20], "core": [6, 20, 22], "msggener": [6, 20, 22], "inject": 6, "readabl": [6, 7, 22, 29], "def": [6, 7, 16, 20, 22], "count": [6, 7, 24], "detector": [6, 7, 22, 24], "det": 6, "default": [6, 12, 23, 24, 29, 30], "onli": [6, 7, 22, 28], "num": [6, 7], "int": [6, 7, 16, 20, 22], "delai": [6, 7], "float": [6, 29], "none": [6, 28], "metadata": [6, 29], "str": [6, 7, 16, 20, 22, 27], "n": 6, "read": [6, 15], "collect": [6, 29, 32], "arg": [6, 16, 28], "fetch": 6, "context": [6, 7], "els": 6, "overriden": 6, "valu": [6, 12, 16, 29], "export": [6, 12, 32], "_description_": 6, "yield": [6, 20], "iter": [6, 7], "md": 6, "configur": [6, 18, 26, 28], "either": [6, 12, 17, 24], "blueskycontext": [6, 7], "go": [6, 11, 22], "all": [6, 7, 9, 10, 30, 32], "them": [6, 7, 12, 13, 22], "detect": [6, 20], "thei": [6, 7, 21, 22, 29], "point": [6, 29], "inspect": 6, "hint": [6, 16], "build": [6, 15, 16], "pydant": [6, 7, 23], "word": 6, "someth": [6, 7, 9, 14], "like": [6, 7, 12, 22], "basemodel": [6, 7, 23], "class": [6, 7], "countparamet": 6, "config": [6, 12, 23, 28, 32], "arbitrary_types_allow": 6, "true": [6, 16, 29, 30], "validate_al": 6, "illustr": 6, "purpos": [6, 12, 21, 22], "actual": [6, 7], "object": [6, 7, 23, 29], "resembl": 6, "construct": 6, "memori": 6, "argument": [6, 28], "check": [6, 7, 9, 10, 12, 13, 14, 16, 17], "until": [6, 24, 28, 29, 30], "store": 6, "On": 6, "A": [6, 22, 29], "send": [6, 20], "form": [6, 7], "look": [6, 7, 12, 22], "param": [6, 7], "andor": [6, 7], "pilatu": [6, 7], "3": [6, 7, 16, 17, 29, 31], "0": [6, 7, 24, 29], "receiv": [6, 20], "intern": [6, 7, 27], "soon": 6, "earlier": 6, "function": [6, 12, 16, 21, 22], "itself": 6, "out": [6, 20], "up": [6, 7, 9, 15, 18, 20, 22], "wa": [6, 7, 29], "publish": [6, 11, 29], "chang": [6, 8, 9, 10, 12, 14, 20, 29], "status": [6, 29], "within": [6, 29], "motor": [6, 22], "posit": [6, 29], "emit": [6, 15], "If": [6, 8, 9, 10, 22, 30, 31], "occur": 6, "dure": [6, 29], "stage": 6, "onward": 6, "sent": [6, 7, 29], "back": [6, 20], "over": [6, 7, 12, 22], "futur": 7, "my_plan": [7, 20, 22], "b": 7, "becom": [7, 22], "myplanmodel": 7, "That": 7, "wai": [7, 26, 32], "pars": 7, "howev": [7, 23], "cover": 7, "doesn": 7, "t": [7, 9, 21, 28], "simpl": 7, "primit": 7, "instead": [7, 9, 25, 30], "ophyd": [7, 29], "cannot": 7, "network": 7, "string": [7, 29, 30], "repres": [7, 21, 29], "id": [7, 29], "suppos": 7, "load": 7, "avail": [7, 12, 18, 22, 24, 25, 28, 30], "signatur": [7, 16], "instanc": [7, 32], "extend": [7, 16], "origin": [7, 29], "allow": [7, 29, 30], "deserialis": 7, "correct": 7, "intermedi": 7, "process": [7, 8, 16], "never": 7, "runtim": 7, "fact": 7, "access": [7, 15, 24, 26, 29], "via": [7, 18, 22, 26, 32], "closur": 7, "circumv": 7, "usual": 7, "problem": 7, "abl": 7, "extern": [7, 29], "place": [7, 9, 22], "level": 7, "my_weird_plan": 7, "c": [7, 28], "dict": 7, "d": 7, "directori": [8, 16, 22], "tox": [8, 10, 12, 13, 17], "static": [8, 15, 16, 17], "pull": [8, 9, 14, 25], "docstr": [8, 16], "standard": [8, 9, 15, 22], "built": [8, 25], "html": [8, 29], "open": [8, 9, 17, 30], "local": [8, 17, 22], "web": 8, "brows": 8, "firefox": 8, "index": [8, 26], "watch": 8, "your": [8, 9, 18, 20, 23, 26], "rebuild": 8, "whenev": 8, "reload": 8, "browser": 8, "page": [8, 11, 16, 29, 30], "view": 8, "localhost": [8, 12, 24], "http": [8, 11, 14, 20, 29, 31], "8000": 8, "make": [8, 9, 15], "sourc": [8, 13, 17, 18, 20, 22, 31], "too": 8, "tell": [8, 10, 24, 32], "src": [8, 23], "welcom": 9, "github": [9, 11, 14, 17, 20, 22, 25, 29, 31], "pleas": [9, 11, 16], "befor": 9, "file": [9, 10, 13, 22, 23, 28, 29, 32], "great": 9, "idea": 9, "involv": [9, 29], "big": 9, "ticket": 9, "want": 9, "sure": 9, "don": 9, "spend": 9, "might": 9, "fit": 9, "scope": 9, "offer": 9, "question": 9, "share": 9, "obviou": 9, "close": [9, 14], "rais": 9, "100": 9, "librari": [9, 20, 22, 26], "bug": 9, "significantli": 9, "reduc": 9, "easili": [9, 20], "caught": 9, "remain": [9, 29], "same": [9, 11], "improv": [9, 21], "environ": [9, 12, 15, 17, 24, 26], "test": [9, 15, 24], "black": [10, 16], "flake8": [10, 16], "isort": [10, 16], "under": [10, 17], "command": [10, 18, 20, 23, 24, 26, 32], "Or": 10, "instal": [10, 12, 15, 18, 20, 22, 24, 25, 26, 32], "hook": 10, "each": [10, 22], "do": [10, 12, 13], "git": [10, 14, 17, 31], "report": [10, 12], "reformat": 10, "repositori": [10, 16, 22], "likewis": 10, "get": [10, 11, 15, 17, 20, 25, 28, 30], "those": 10, "manual": 10, "formatt": 10, "save": [10, 28], "highlight": [10, 13], "editor": 10, "window": 10, "checklist": 11, "choos": [11, 17], "pep440": 11, "compliant": 11, "pep": 11, "org": [11, 29], "0440": 11, "draft": 11, "click": [11, 17, 18], "tag": 11, "suppli": [11, 29], "chose": 11, "review": 11, "edit": [11, 12, 22, 23], "titl": [11, 16, 29], "push": 11, "branch": 11, "effect": [11, 22], "except": 11, "find": 12, "coverag": 12, "commandlin": [12, 31], "cov": 12, "xml": 12, "connect": 12, "live": 12, "broker": [12, 24], "present": 12, "inconveni": 12, "wish": [12, 23], "unrel": 12, "avoid": 12, "still": 12, "ci": 12, "noth": 12, "slip": 12, "crack": 12, "support": 12, "rabbitmq": 12, "rabbitmq_stomp": 12, "plugin": 12, "61613": [12, 24], "host": [12, 17, 24, 32], "port": 12, "stompconfig": 12, "py": [12, 23], "blueapi_test_stomp_port": 12, "multipl": [12, 14, 20, 22], "61614": [12, 24], "onc": 12, "per": [12, 22], "develop": [12, 20, 22, 24, 28], "outdat": 12, "unmaintain": 12, "imag": 12, "suffici": 12, "alreadi": [12, 25], "recommend": [12, 31], "deploy": 12, "long": 12, "term": 12, "8161": 12, "docker": [12, 25, 32], "p": [12, 17, 24], "rmohr": [12, 32], "As": [12, 16], "activ": [12, 17, 18, 30, 31], "packag": [12, 17, 22], "helm": 12, "chart": 12, "enabl": 12, "authent": 12, "15672": 12, "exec": 12, "definit": 13, "without": 13, "potenti": 13, "match": 13, "merg": 14, "python3": [14, 17, 31], "pip": [14, 17, 20, 22, 24, 31], "skeleton": [14, 22], "structur": [14, 29], "keep": [14, 29], "techniqu": 14, "sync": 14, "latest": 14, "version": [14, 18, 25, 27, 28, 29], "rebas": 14, "fals": [14, 29, 30], "com": [14, 17, 29, 31], "diamondlightsourc": [14, 17, 20, 25, 29, 31], "conflict": [14, 30], "indic": [14, 29], "area": 14, "more": [14, 17, 21, 22, 26], "detail": 14, "split": [15, 20, 26], "four": [15, 21, 26], "categori": [15, 26], "side": [15, 22, 26], "bar": [15, 20, 26], "debug": [15, 24], "contribut": [15, 20], "doc": [15, 16, 17, 29], "sphinx": [15, 16, 17], "pytest": [15, 17], "analysi": [15, 16, 17], "mypi": [15, 16, 17], "lint": [15, 16, 17], "pre": [15, 16, 17, 25], "commit": [15, 16, 17], "tool": [15, 16, 22, 24], "releas": [15, 20, 25, 26, 31], "practic": [15, 26], "step": [15, 17, 22, 26], "dai": 15, "dev": [15, 17], "architectur": 15, "decis": 15, "record": 15, "lifecycl": 15, "why": [15, 26], "technic": [15, 21, 26], "materi": [15, 26], "format": [16, 29], "style": [16, 22, 29], "order": [16, 21], "how": [16, 21, 29], "guid": [16, 20, 21, 22], "napoleon": 16, "extens": 16, "googl": 16, "func": 16, "arg1": 16, "arg2": 16, "bool": 16, "summari": [16, 29], "line": [16, 18, 24, 26, 32], "descript": [16, 29], "extract": 16, "underlin": 16, "convent": 16, "headl": 16, "head": 16, "minim": [17, 20, 24], "machin": 17, "venv": [17, 18, 31], "9": [17, 31, 32], "later": [17, 29, 31], "vscode": [17, 18, 24], "virtualenv": 17, "cd": 17, "m": [17, 31], "bin": [17, 18, 31], "devcontain": 17, "reopen": 17, "prompt": 17, "epic": 17, "complex": 17, "integr": 17, "podman": [17, 32], "graph": 17, "tree": 17, "pipdeptre": 17, "now": [17, 31], "parallel": 17, "insid": [18, 20, 22], "virtual": 18, "cli": [18, 23, 26, 28, 32], "serv": [18, 32], "addit": 18, "capabl": [18, 32], "navig": 18, "left": 18, "hand": 18, "menu": 18, "select": 18, "green": 18, "button": 18, "lightweight": 20, "wrapper": 20, "applic": [20, 22, 26, 29], "usabl": 20, "pypi": [20, 22], "io": [20, 25], "expos": 20, "endpoint": [20, 30], "lab": 20, "peopl": 20, "equip": 20, "possibli": 20, "remot": 20, "locat": 20, "premis": 20, "boilerpl": 20, "annot": [20, 22], "foo": [20, 22], "scan": [20, 29], "automat": [20, 22], "invok": 20, "few": 20, "rest": [20, 26, 28], "call": [20, 21, 23, 30], "section": 20, "grand": 21, "unifi": 21, "theori": 21, "david": 21, "la": 21, "There": 21, "secret": 21, "understood": 21, "write": [21, 23], "good": 21, "softwar": [21, 31], "isn": 21, "thing": 21, "tutori": [21, 22], "explan": 21, "approach": 21, "creation": 21, "understand": 21, "implic": 21, "help": 21, "often": 21, "immens": 21, "custom": [22, 24, 32], "tailor": 22, "individu": 22, "experiment": 22, "ad": 22, "both": 22, "relev": 22, "path": [22, 23, 28, 31, 32], "part": 22, "tweak": 22, "pyproject": 22, "toml": 22, "easiest": 22, "put": [22, 30], "mani": 22, "singl": 22, "spread": 22, "movabl": 22, "sample_nam": 22, "extra_metadata": 22, "logic": 22, "goe": 22, "here": [22, 26], "dodal": 22, "factori": 22, "mytypeofdetector": 22, "determin": 22, "pick": 22, "similarli": 22, "organ": 22, "prefer": 22, "my_facility_devic": 22, "my_detector": 22, "other_config": 22, "extra": 22, "preserv": 22, "own": [22, 23], "were": 22, "my_plan_librari": 22, "tomographi": 22, "env": 22, "kind": 22, "referenc": [22, 29], "initi": [22, 29], "particular": [22, 30], "my_lab": 22, "my_beamlin": 22, "planfunct": 22, "By": [23, 24, 30], "ingest": 23, "overrid": 23, "yaml": [23, 28], "found": 23, "schema": [23, 29], "applicationconfig": 23, "simpli": 23, "rel": 23, "Then": 23, "subsequ": 23, "child": 23, "come": [24, 32], "client": [24, 28, 29], "product": 24, "talk": 24, "tcp": 24, "h": 24, "my": 24, "sleep": 24, "5": [24, 32], "current_det": 24, "image_det": 24, "block": 24, "statu": [24, 29, 30], "full": [24, 28, 32], "interfac": [24, 26, 31, 32], "ghcr": 25, "quickstart": 26, "usag": 26, "experienc": 26, "work": 26, "__version__": 27, "calcul": 27, "pypa": 27, "setuptools_scm": 27, "show": 28, "exit": 28, "util": 28, "introspect": 28, "mark": [28, 30], "ongo": 28, "reason": [28, 30], "defer": [28, 30], "next": [28, 30], "checkpoint": [28, 30], "timeout": 28, "second": 28, "hang": 28, "forev": 28, "print": 28, "success": [28, 30], "o": 28, "output": 28, "u": 28, "track": 29, "channel": 29, "asyncapi": 29, "6": 29, "info": 29, "contact": 29, "callum": 29, "forrest": 29, "email": 29, "diamond": 29, "ac": 29, "uk": 29, "licens": 29, "apach": 29, "url": 29, "www": 29, "defaultcontenttyp": 29, "public": 29, "oper": 29, "operationid": 29, "dataev": 29, "oneof": 29, "ref": 29, "compon": 29, "workerstateev": 29, "workerprogressev": 29, "taggedstartdocu": 29, "taggeddescriptordocu": 29, "taggedeventdocu": 29, "taggedstopdocu": 29, "taggedresourcedocu": 29, "taggeddatumdocu": 29, "taggedresourcestream": 29, "taggeddatumstream": 29, "taggedeventpag": 29, "taggeddatumpag": 29, "todo": 29, "correlationid": 29, "bind": 29, "messageid": 29, "runstart": 29, "previous": 29, "specifi": 29, "header": 29, "contexthead": 29, "payload": 29, "properti": 29, "raw": 29, "githubusercont": 29, "master": 29, "event_model": 29, "run_start": 29, "runstop": 29, "condit": 29, "run_stop": 29, "eventstreamdescriptor": 29, "scientif": 29, "stream": 29, "measur": 29, "event_descriptor": 29, "eventpag": 29, "deprec": 29, "event_pag": 29, "resourc": 29, "databas": 29, "entri": 29, "datum": 29, "datumpag": 29, "datum_pag": 29, "streamresourc": 29, "stream_resourc": 29, "streamdatum": 29, "slice": 29, "stream_datum": 29, "stateev": 29, "warn": 29, "workerst": 29, "taskstatu": 29, "arrai": 29, "item": 29, "progressev": 29, "tasknam": 29, "uniqu": [29, 30], "submit": [29, 30], "additionalproperti": 29, "statusview": 29, "destin": 29, "replydestin": 29, "temporari": 29, "caller": 29, "listen": 29, "x": 29, "identifi": 29, "exchang": 29, "enum": 29, "idl": 29, "halt": 29, "abort": [29, 30], "suspend": 29, "panick": 29, "unknown": 29, "taskcomplet": 29, "taskfail": 29, "reac": 29, "boolean": 29, "outcom": 29, "achiev": 29, "displaynam": 29, "unit": 29, "precis": 29, "target": 29, "sensibl": 29, "displai": [29, 32], "integ": 29, "percentag": 29, "timeelaps": 29, "elaps": 29, "begin": 29, "timeremain": 29, "estim": 29, "fastapi": 30, "interact": 30, "possibl": 30, "retriev": 30, "200": 30, "ok": 30, "422": 30, "unprocess": 30, "entiti": 30, "post": 30, "201": 30, "delet": 30, "task_id": 30, "transit": 30, "202": 30, "new_stat": 30, "resum": 30, "rewind": 30, "previou": 30, "wait": 30, "failur": 30, "400": 30, "bad": 30, "409": 30, "interfer": 31, "featur": 31, "act": 32, "laboratori": 32, "downstream": 32, "simplest": 32, "rm": 32, "net": 32, "15": 32, "alpin": 32, "queri": 32}, "objects": {"": [[30, 0, 1, "get--devices", "/devices"], [30, 0, 1, "get--devices-name", "/devices/{name}"], [30, 0, 1, "get--plans", "/plans"], [30, 0, 1, "get--plans-name", "/plans/{name}"], [30, 1, 1, "post--tasks", "/tasks"], [30, 2, 1, "delete--tasks-task_id", "/tasks/{task_id}"], [30, 0, 1, "get--tasks-task_id", "/tasks/{task_id}"], [30, 0, 1, "get--worker-state", "/worker/state"], [30, 3, 1, "put--worker-state", "/worker/state"], [30, 0, 1, "get--worker-task", "/worker/task"], [30, 3, 1, "put--worker-task", "/worker/task"], [27, 4, 0, "-", "blueapi"]], "blueapi.blueapi": [[27, 5, 1, "", "__version__"]], "blueapi-controller-abort": [[28, 6, 1, "cmdoption-blueapi-controller-abort-arg-REASON", "REASON"]], "blueapi-controller-pause": [[28, 6, 1, "cmdoption-blueapi-controller-pause-defer", "--defer"]], "blueapi-controller-run": [[28, 6, 1, "cmdoption-blueapi-controller-run-t", "--timeout"], [28, 6, 1, "cmdoption-blueapi-controller-run-t", "-t"], [28, 6, 1, "cmdoption-blueapi-controller-run-arg-NAME", "NAME"], [28, 6, 1, "cmdoption-blueapi-controller-run-arg-PARAMETERS", "PARAMETERS"]], "blueapi-schema": [[28, 6, 1, "cmdoption-blueapi-schema-o", "--output"], [28, 6, 1, "cmdoption-blueapi-schema-u", "--update"], [28, 6, 1, "cmdoption-blueapi-schema-o", "-o"], [28, 6, 1, "cmdoption-blueapi-schema-u", "-u"]], "blueapi": [[28, 6, 1, "cmdoption-blueapi-c", "--config"], [28, 6, 1, "cmdoption-blueapi-version", "--version"], [28, 6, 1, "cmdoption-blueapi-c", "-c"]]}, "objtypes": {"0": "http:get", "1": "http:post", "2": "http:delete", "3": "http:put", "4": "py:module", "5": "py:data", "6": "std:cmdoption"}, "objnames": {"0": ["http", "get", "HTTP get"], "1": ["http", "post", "HTTP post"], "2": ["http", "delete", "HTTP delete"], "3": ["http", "put", "HTTP put"], "4": ["py", "module", "Python module"], "5": ["py", "data", "Python data"], "6": ["std", "cmdoption", "program option"]}, "titleterms": {"architectur": [0, 1, 2], "kei": 0, "compon": 0, "The": 0, "blueskycontext": 0, "object": 0, "worker": [0, 5, 18, 24, 32], "servic": 0, "decis": [1, 2, 3, 4], "record": [1, 2], "1": 2, "statu": [2, 3, 4], "context": [2, 3, 4], "consequ": [2, 3, 4], "2": [3, 4], "No": 3, "queue": 3, "api": [4, 19, 27], "model": 4, "case": 4, "event": 5, "emit": 5, "reason": 5, "new": 5, "correl": 5, "id": 5, "header": 5, "lifecycl": 6, "plan": [6, 22, 24, 28], "load": 6, "registr": 6, "startup": 6, "request": 6, "valid": [6, 7], "execut": 6, "type": 7, "requir": 7, "solut": 7, "build": [8, 17], "doc": 8, "us": [8, 10, 12, 13], "sphinx": 8, "autobuild": 8, "contribut": 9, "project": 9, "issu": [9, 10], "discuss": 9, "code": [9, 16, 22], "coverag": 9, "develop": [9, 15, 17, 18], "guid": [9, 15, 26, 32], "run": [10, 12, 13, 18, 24, 25, 28, 32], "lint": 10, "pre": 10, "commit": 10, "fix": 10, "vscode": 10, "support": 10, "make": 11, "releas": 11, "test": [12, 17, 32], "pytest": 12, "skip": 12, "messag": [12, 29], "bu": 12, "configur": [12, 22, 23], "buss": 12, "static": 13, "analysi": 13, "mypi": 13, "updat": 14, "tool": 14, "tutori": [15, 26], "how": [15, 20, 26], "explan": [15, 26], "refer": [15, 26], "standard": 16, "document": [16, 20, 21], "instal": [17, 31], "clone": 17, "repositori": 17, "depend": 17, "see": 17, "what": 17, "wa": 17, "debug": 18, "environ": [18, 22, 31], "start": [18, 25, 32], "blueski": 18, "index": 19, "blueapi": [20, 22, 27, 28], "i": [20, 32], "structur": 20, "about": 21, "add": 22, "devic": [22, 28], "your": [22, 31], "home": 22, "format": 22, "applic": 23, "control": [24, 28], "via": 24, "cli": 24, "basic": 24, "introspect": 24, "contain": 25, "user": 26, "command": 28, "line": 28, "interfac": 28, "abort": 28, "paus": 28, "resum": 28, "state": 28, "stop": 28, "schema": 28, "serv": 28, "specif": [29, 30], "rest": 30, "check": 31, "version": 31, "python": 31, "creat": 31, "virtual": 31, "librari": 31, "quickstart": 32, "activemq": 32}, "envversion": {"sphinx.domains.c": 3, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 9, "sphinx.domains.index": 1, "sphinx.domains.javascript": 3, "sphinx.domains.math": 2, "sphinx.domains.python": 4, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx.ext.viewcode": 1, "sphinx": 60}, "alltitles": {"Architecture": [[0, "architecture"]], "Key Components": [[0, "key-components"]], "The BlueskyContext Object": [[0, "the-blueskycontext-object"]], "The Worker Object": [[0, "the-worker-object"]], "The Service Object": [[0, "the-service-object"]], "Architectural Decision Records": [[1, "architectural-decision-records"]], "1. Record architecture decisions": [[2, "record-architecture-decisions"]], "Status": [[2, "status"], [3, "status"], [4, "status"]], "Context": [[2, "context"], [3, "context"], [4, "context"]], "Decision": [[2, "decision"], [3, "decision"], [4, "decision"]], "Consequences": [[2, "consequences"], [3, "consequences"], [4, "consequences"]], "2. No Queues": [[3, "no-queues"]], "2. API Model Case": [[4, "api-model-case"]], "Events Emitted by the Worker": [[5, "events-emitted-by-the-worker"]], "Reasons": [[5, "reasons"]], "New Events": [[5, "new-events"]], "Correlation ID": [[5, "correlation-id"]], "Correlation ID Headers": [[5, "id2"]], "Lifecycle of a Plan": [[6, "lifecycle-of-a-plan"]], "Loading and Registration": [[6, "loading-and-registration"]], "Startup": [[6, "startup"]], "Request": [[6, "request"]], "Validation": [[6, "validation"]], "Execution": [[6, "execution"]], "Type Validators": [[7, "type-validators"]], "Requirement": [[7, "requirement"]], "Solution": [[7, "solution"]], "Build the docs using sphinx": [[8, "build-the-docs-using-sphinx"]], "Autobuild": [[8, "autobuild"]], "Contributing to the project": [[9, "contributing-to-the-project"]], "Issue or Discussion?": [[9, "issue-or-discussion"]], "Code coverage": [[9, "code-coverage"]], "Developer guide": [[9, "developer-guide"]], "Run linting using pre-commit": [[10, "run-linting-using-pre-commit"]], "Running pre-commit": [[10, "running-pre-commit"]], "Fixing issues": [[10, "fixing-issues"]], "VSCode support": [[10, "vscode-support"]], "Make a release": [[11, "make-a-release"]], "Run the tests using pytest": [[12, "run-the-tests-using-pytest"]], "Skip the message bus tests": [[12, "skip-the-message-bus-tests"]], "Configure message busses": [[12, "configure-message-busses"]], "Run static analysis using mypy": [[13, "run-static-analysis-using-mypy"]], "Update the tools": [[14, "update-the-tools"]], "Developer Guide": [[15, "developer-guide"]], "Tutorials": [[15, null], [26, null]], "How-to Guides": [[15, null], [26, null]], "Explanations": [[15, null], [26, null]], "Reference": [[15, null], [26, null]], "Standards": [[16, "standards"]], "Code Standards": [[16, "code-standards"]], "Documentation Standards": [[16, "documentation-standards"]], "Developer install": [[17, "developer-install"]], "Clone the repository": [[17, "clone-the-repository"]], "Install dependencies": [[17, "install-dependencies"]], "See what was installed": [[17, "see-what-was-installed"]], "Build and test": [[17, "build-and-test"]], "Run/Debug in a Developer Environment": [[18, "run-debug-in-a-developer-environment"]], "Start Bluesky Worker": [[18, "start-bluesky-worker"]], "API Index": [[19, "api-index"]], "blueapi": [[20, "blueapi"], [27, "blueapi"], [28, "blueapi"]], "How the documentation is structured": [[20, "how-the-documentation-is-structured"]], "About the documentation": [[21, "about-the-documentation"]], "Add Plans and Devices to your Blueapi Environment": [[22, "add-plans-and-devices-to-your-blueapi-environment"]], "Home of Code": [[22, "home-of-code"]], "Format": [[22, "format"]], "Configuration": [[22, "configuration"]], "Configure the application": [[23, "configure-the-application"]], "Control the Worker via the CLI": [[24, "control-the-worker-via-the-cli"]], "Basic Introspection": [[24, "basic-introspection"]], "Running Plans": [[24, "running-plans"]], "Run in a container": [[25, "run-in-a-container"]], "Starting the container": [[25, "starting-the-container"]], "User Guide": [[26, "user-guide"]], "API": [[27, "api"]], "Command-Line Interface": [[28, "command-line-interface"]], "controller": [[28, "blueapi-controller"]], "abort": [[28, "blueapi-controller-abort"]], "devices": [[28, "blueapi-controller-devices"]], "pause": [[28, "blueapi-controller-pause"]], "plans": [[28, "blueapi-controller-plans"]], "resume": [[28, "blueapi-controller-resume"]], "run": [[28, "blueapi-controller-run"]], "state": [[28, "blueapi-controller-state"]], "stop": [[28, "blueapi-controller-stop"]], "schema": [[28, "blueapi-schema"]], "serve": [[28, "blueapi-serve"]], "Messaging Specification": [[29, "messaging-specification"]], "REST Specification": [[30, "rest-specification"]], "Installation": [[31, "installation"]], "Check your version of python": [[31, "check-your-version-of-python"]], "Create a virtual environment": [[31, "create-a-virtual-environment"]], "Installing the library": [[31, "installing-the-library"]], "Quickstart Guide": [[32, "quickstart-guide"]], "Start ActiveMQ": [[32, "start-activemq"]], "Start Worker": [[32, "start-worker"]], "Test that the Worker is Running": [[32, "test-that-the-worker-is-running"]]}, "indexentries": {"blueapi": [[27, "module-blueapi"]], "blueapi.__version__ (in module blueapi)": [[27, "blueapi.blueapi.__version__"]], "module": [[27, "module-blueapi"]], "--config": [[28, "cmdoption-blueapi-c"]], "--defer": [[28, "cmdoption-blueapi-controller-pause-defer"]], "--output": [[28, "cmdoption-blueapi-schema-o"]], "--timeout": [[28, "cmdoption-blueapi-controller-run-t"]], "--update": [[28, "cmdoption-blueapi-schema-u"]], "--version": [[28, "cmdoption-blueapi-version"]], "-c": [[28, "cmdoption-blueapi-c"]], "-o": [[28, "cmdoption-blueapi-schema-o"]], "-t": [[28, "cmdoption-blueapi-controller-run-t"]], "-u": [[28, "cmdoption-blueapi-schema-u"]], "name": [[28, "cmdoption-blueapi-controller-run-arg-NAME"]], "parameters": [[28, "cmdoption-blueapi-controller-run-arg-PARAMETERS"]], "reason": [[28, "cmdoption-blueapi-controller-abort-arg-REASON"]], "blueapi command line option": [[28, "cmdoption-blueapi-c"], [28, "cmdoption-blueapi-version"]], "blueapi-controller-abort command line option": [[28, "cmdoption-blueapi-controller-abort-arg-REASON"]], "blueapi-controller-pause command line option": [[28, "cmdoption-blueapi-controller-pause-defer"]], "blueapi-controller-run command line option": [[28, "cmdoption-blueapi-controller-run-arg-NAME"], [28, "cmdoption-blueapi-controller-run-arg-PARAMETERS"], [28, "cmdoption-blueapi-controller-run-t"]], "blueapi-schema command line option": [[28, "cmdoption-blueapi-schema-o"], [28, "cmdoption-blueapi-schema-u"]]}})