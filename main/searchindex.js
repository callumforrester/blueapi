Search.setIndex({"docnames": ["explanations", "explanations/architecture", "explanations/decisions", "explanations/decisions/0001-record-architecture-decisions", "explanations/decisions/0002-no-queues", "explanations/decisions/0003-api-case", "explanations/decisions/0004-switched-to-python-copier-template", "explanations/events", "explanations/lifecycle", "explanations/type_validators", "genindex", "how-to", "how-to/add-plans-and-devices", "how-to/configure-app", "how-to/contribute", "how-to/run-cli", "how-to/run-container", "how-to/write-plans", "index", "reference", "reference/api", "reference/cli", "reference/messaging-spec", "reference/rest-spec", "tutorials", "tutorials/dev-run", "tutorials/installation", "tutorials/quickstart"], "filenames": ["explanations.md", "explanations/architecture.rst", "explanations/decisions.md", "explanations/decisions/0001-record-architecture-decisions.rst", "explanations/decisions/0002-no-queues.rst", "explanations/decisions/0003-api-case.rst", "explanations/decisions/0004-switched-to-python-copier-template.md", "explanations/events.rst", "explanations/lifecycle.rst", "explanations/type_validators.rst", "genindex.md", "how-to.md", "how-to/add-plans-and-devices.rst", "how-to/configure-app.rst", "how-to/contribute.md", "how-to/run-cli.rst", "how-to/run-container.rst", "how-to/write-plans.rst", "index.md", "reference.md", "reference/api.md", "reference/cli.rst", "reference/messaging-spec.rst", "reference/rest-spec.rst", "tutorials.md", "tutorials/dev-run.rst", "tutorials/installation.md", "tutorials/quickstart.rst"], "titles": ["Explanations", "Architecture", "Architectural Decision Records", "1. Record architecture decisions", "2. No Queues", "2. API Model Case", "4. Adopt python-copier-template for project structure", "Events Emitted by the Worker", "Lifecycle of a Plan", "Type Validators", "Index", "How-to Guides", "Add Plans and Devices to your Blueapi Environment", "Configure the application", "Contribute to the project", "Control the Worker via the CLI", "Run in a container", "Writing Bluesky plans for Blueapi", "blueapi", "Reference", "API", "Command-Line Interface", "Messaging Specification", "REST Specification", "Tutorials", "Run/Debug in a Developer Environment", "Installation", "Quickstart Guide"], "terms": {"how": [0, 14, 22, 25], "work": [0, 18], "why": [0, 18], "wai": [0, 2, 9, 12, 18, 27], "architectur": [0, 18], "decis": [0, 18], "record": [0, 18], "event": [0, 1, 8, 17, 18, 21, 22, 27], "emit": [0, 8, 18], "worker": [0, 4, 8, 11, 18, 21, 22, 23], "lifecycl": [0, 18], "plan": [0, 1, 5, 7, 9, 11, 18, 22, 23, 27], "type": [0, 8, 12, 13, 18, 22, 26], "valid": [0, 1, 17, 18, 23], "blueapi": [1, 7, 8, 9, 11, 13, 15, 16, 22, 23, 25, 26, 27], "perform": 1, "number": [1, 7, 8, 14, 16, 17, 20, 22], "task": [1, 4, 14, 21, 22, 23], "manag": [1, 6], "blueski": [1, 7, 8, 9, 11, 12, 18, 22, 27], "runengin": [1, 7, 8, 17], "give": [1, 7], "instruct": [1, 25], "handl": [1, 7, 14], "its": [1, 8, 12, 14, 16, 17, 22, 23, 26], "error": [1, 4, 7, 8, 15, 22, 23], "tradition": [1, 7], "thi": [1, 2, 3, 4, 5, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 20, 22, 23, 26], "job": [1, 18], "ha": [1, 7, 9, 17, 23, 26, 27], "been": [1, 17, 26], "done": [1, 22], "human": [1, 7, 22], "an": [1, 4, 7, 8, 9, 12, 13, 17, 18, 22], "ipython": [1, 7], "termin": [1, 7, 26, 27], "so": [1, 5, 7, 9, 17, 18, 26, 27], "requir": [1, 8, 12, 17, 18, 21, 22, 26, 27], "autom": [1, 7], "maintain": 1, "registri": [1, 8, 16], "devic": [1, 8, 9, 11, 15, 17, 18, 22, 23, 27], "In": [1, 4, 7, 8, 12, 15], "aforement": 1, "case": [1, 2, 7, 9, 12], "would": [1, 12], "have": [1, 6, 9, 12, 14, 15, 17, 25, 27], "just": [1, 7, 12], "global": [1, 8], "variabl": [1, 8], "commun": 1, "outsid": [1, 7, 17], "world": 1, "accept": [1, 3, 4, 5, 6, 17, 21, 23], "run": [1, 4, 7, 8, 11, 12, 14, 17, 18, 22, 23, 24], "provid": [1, 22], "updat": [1, 6, 21, 23], "progress": [1, 22], "etc": [1, 7, 17, 22], "These": [1, 7, 9, 17], "respons": [1, 4, 22, 23], "ar": [1, 2, 4, 7, 8, 9, 12, 13, 14, 15, 16, 17, 23, 25], "kept": [1, 4], "separ": 1, "codebas": 1, "ensur": [1, 6, 25], "clean": 1, "main": [1, 16, 18, 25], "hold": [1, 4, 8], "well": [1, 8, 22], "helper": 1, "method": [1, 9, 17], "regist": [1, 8], "en": 1, "mass": 1, "from": [1, 3, 5, 6, 7, 8, 9, 12, 13, 15, 16, 17, 18, 22, 25, 26, 27], "normal": 1, "python": [1, 2, 5, 12, 14, 17, 25], "modul": [1, 6, 8, 12, 17, 18], "wrap": [1, 18], "request": [1, 4, 9, 14, 22, 23], "includ": [1, 5, 7, 8, 12, 17, 18, 19], "name": [1, 5, 7, 8, 9, 12, 17, 21, 22, 23], "dictionari": [1, 9], "paramet": [1, 5, 8, 9, 15, 21, 23], "pass": [1, 8, 9, 13, 15, 17, 23], "against": [1, 8, 9, 27], "known": [1, 9, 17, 22], "expect": [1, 9, 17, 22], "ani": [1, 4, 5, 8, 9, 12, 13, 14, 17, 21, 22, 23, 26], "api": [1, 2, 4, 12, 18, 19, 21, 22], "layer": 1, "refer": [1, 8, 9, 15, 17, 18, 20, 21, 27], "can": [1, 4, 6, 7, 8, 9, 12, 13, 14, 15, 17, 18, 22, 23, 25, 26, 27], "interrog": 1, "messag": [1, 7, 8, 15, 17, 18, 19], "reciev": [1, 22], "bu": [1, 8, 22], "It": [1, 8, 14, 15, 26, 27], "also": [1, 7, 8, 9, 12, 14, 15, 18, 26, 27], "forward": [1, 15], "variou": [1, 9, 22], "gener": [1, 8, 9, 12, 17, 18, 21, 22], "topic": 1, "made": [2, 3, 12, 17], "throughout": 2, "project": [2, 3, 11, 12, 17, 18], "": [2, 3, 7, 8, 9, 14, 17, 18], "lifetim": 2, "As": [2, 6], "keep": [2, 22], "track": [2, 22], "we": [2, 3, 4, 5, 6, 7, 14, 17], "adr": [2, 3], "list": [2, 8, 9, 17, 21, 22], "below": [2, 7, 12, 17], "1": [2, 8, 9, 17], "2": [2, 22], "No": 2, "queue": [2, 8, 22], "model": [2, 7, 8, 9, 17, 22], "4": 2, "adopt": 2, "copier": [2, 14, 25], "templat": [2, 14, 25], "structur": [2, 17, 22], "For": [2, 7, 9, 12, 14, 17, 18], "more": [2, 11, 12, 14, 18], "inform": [2, 7, 23], "see": [2, 3, 7, 9, 12, 14, 17], "blog": 2, "michael": [2, 3], "nygard": [2, 3], "date": [3, 4, 5], "2022": 3, "02": 3, "18": 3, "need": [3, 12, 14, 25, 26], "us": [3, 6, 7, 9, 12, 13, 14, 16, 17, 18, 21, 26, 27], "describ": [3, 22], "articl": 3, "link": [3, 18], "abov": [3, 12, 27], "To": [3, 13, 16, 17, 27], "creat": [3, 9, 12, 14, 23], "new": [3, 9, 12, 14, 17, 18, 24], "copi": 3, "past": 3, "exist": [3, 8, 13, 14, 26], "ones": [3, 5], "2023": [4, 5], "05": [4, 5], "22": 4, "ask": [4, 7, 14], "whether": [4, 5, 7, 22], "servic": [4, 8, 18, 22, 25, 27], "should": [4, 5, 6, 9, 12, 15, 17, 26, 27], "execut": [4, 21, 22], "The": [4, 5, 6, 7, 8, 9, 12, 15, 17, 18, 22, 23, 25, 26, 27], "one": [4, 14, 17], "time": [4, 7, 8, 9, 14, 15, 17, 22], "return": [4, 8, 9, 12, 17, 22, 23], "while": [4, 8, 14, 17], "anoth": 4, "i": [4, 5, 7, 8, 9, 12, 13, 14, 15, 17, 20, 22, 23, 26], "differ": [4, 5, 6, 7, 17], "must": [4, 7, 9, 12, 15, 17], "free": [4, 12, 14], "although": 4, "transact": 4, "permit": 4, "where": [4, 9, 12, 13, 17, 18, 22], "server": [4, 15, 18, 23], "cach": 4, "23": 5, "consid": 5, "kei": [5, 8, 17], "json": [5, 8, 9, 15, 17, 22], "blob": 5, "snake_cas": 5, "camelcas": 5, "which": [5, 7, 8, 12, 13, 15, 17, 22, 23], "mai": [5, 6, 8, 12, 17, 18, 23], "user": [5, 7, 8, 11, 18, 24], "defin": [5, 9, 12, 13, 17, 22], "prioriti": 5, "confus": 5, "alia": 5, "field": [5, 17], "most": [5, 14], "code": [5, 7, 8, 23], "written": [5, 8, 17], "pep8": 5, "enforc": 5, "mean": [5, 12], "some": [5, 12, 17], "follow": [6, 8, 12, 13, 17, 18, 23, 25], "consist": [6, 17], "develop": [6, 12, 15, 18, 21, 24], "environ": [6, 11, 14, 15, 18, 23, 24], "packag": [6, 12, 17], "switch": 6, "fix": 6, "set": [6, 7, 9, 12, 13, 14, 17, 23, 25], "tool": [6, 12, 15], "pull": [6, 14, 16], "latest": [6, 18], "techniqu": 6, "chang": [6, 8, 14, 22], "could": 6, "lint": 6, "format": [6, 22], "pip": [6, 12, 15, 18, 26], "venv": [6, 25, 26], "setup": [6, 7, 25, 27], "ci": 6, "cd": 6, "add": [7, 11, 18], "top": [7, 18], "sinc": [7, 22], "front": 7, "sometim": [7, 12], "assum": [7, 25, 27], "intuit": 7, "behaviour": 7, "replac": [7, 9], "fill": 7, "gap": 7, "base": [7, 17, 22], "engin": 7, "programat": 7, "data": [7, 8, 17, 18, 22, 27], "conform": [7, 17], "meant": [7, 15], "other": [7, 8, 17, 22, 23], "subscrib": [7, 22], "e": [7, 8, 9, 12, 17], "g": [7, 8, 9, 12, 17], "databrok": 7, "decoupl": 7, "concern": 7, "start": [7, 8, 18, 22, 24], "finish": [7, 8, 15], "paus": [7, 22, 23], "exampl": [7, 9, 12, 13, 17, 18], "sequenc": [7, 17], "emiss": 7, "compar": 7, "complic": 7, "note": [7, 12, 15, 18, 19], "between": [7, 8, 17], "issu": 7, "first": [7, 12], "document": [7, 8, 17, 21, 22, 23], "similar": [7, 12], "stop": [7, 22, 23], "v": 7, "end": [7, 14, 22, 23], "thsse": 7, "typic": [7, 18, 24], "cleanup": 7, "produc": [7, 22], "arbitrari": [7, 15], "fine": 7, "becaus": [7, 9, 12], "when": [7, 8, 9, 14, 17, 22], "associ": [7, 22], "introduc": 7, "specif": [7, 12, 17, 18, 19, 27], "pertain": 7, "state": [7, 8, 9, 22, 23], "At": [7, 8, 9], "mimimum": 7, "everi": [7, 17], "complet": [7, 17, 22, 27], "fail": [7, 8, 21], "latter": 7, "about": [7, 17, 23, 27], "control": [7, 11, 17, 18, 22, 25, 27], "verifi": 7, "realli": 7, "relat": [7, 22], "you": [7, 12, 13, 14, 15, 17, 25, 26, 27], "therefor": [7, 17], "bundl": 7, "contain": [7, 11, 12, 14, 15, 18, 27], "microsoft": 7, "playbook": 7, "activemq": [7, 25], "depend": [7, 16, 26], "protocol": [7, 8, 9, 12, 17, 22], "jm": 7, "jms_correlationid": 7, "stomp": 7, "demonstr": 8, "exactli": 8, "what": [8, 12, 22], "doe": [8, 12, 14, 17], "through": [8, 9, 12, 14, 23], "being": [8, 9, 22], "take": [8, 9, 17, 18], "import": [8, 12, 17, 18], "map": [8, 12, 17], "option": [8, 13, 17, 21], "union": 8, "bp": [8, 17, 18], "core": [8, 12, 17, 18], "msggener": [8, 12, 17, 18], "dls_bluesky_cor": 8, "inject": 8, "readabl": [8, 9, 12, 17, 22], "def": [8, 9, 12, 17, 18], "count": [8, 9, 15, 17], "detector": [8, 9, 12, 15, 17], "det": 8, "default": [8, 13, 15, 22, 23], "onli": [8, 9, 12, 17, 21], "num": [8, 9], "int": [8, 9, 12, 18], "delai": [8, 9], "float": [8, 17, 22], "none": [8, 17, 21], "metadata": [8, 22], "str": [8, 9, 12, 17, 18, 20], "n": 8, "read": [8, 17], "collect": [8, 17, 22, 27], "arg": [8, 17, 21], "fetch": [8, 17], "context": [8, 9, 17], "els": 8, "overriden": 8, "valu": [8, 12, 22], "export": [8, 17, 27], "_description_": 8, "yield": [8, 17, 18], "iter": [8, 9, 17], "md": [8, 17], "configur": [8, 11, 14, 17, 18, 21, 25], "either": [8, 15], "blueskycontext": [8, 9], "go": [8, 12], "all": [8, 9, 14, 17, 23, 27], "them": [8, 9, 12, 17], "detect": [8, 18], "thei": [8, 9, 12, 17, 22], "point": [8, 22], "inspect": 8, "hint": 8, "build": 8, "pydant": [8, 9, 13, 17], "word": 8, "someth": [8, 9, 14], "like": [8, 9, 12, 14], "basemodel": [8, 9, 13, 17], "class": [8, 9], "countparamet": 8, "config": [8, 13, 21, 27], "arbitrary_types_allow": 8, "true": [8, 22, 23], "validate_al": 8, "illustr": 8, "purpos": [8, 12, 17], "actual": [8, 9], "object": [8, 9, 13, 17, 22], "resembl": 8, "construct": [8, 17], "memori": 8, "argument": [8, 21], "check": [8, 9, 14, 17], "until": [8, 15, 21, 22, 23], "store": 8, "On": 8, "A": [8, 12, 17, 22], "send": [8, 18], "form": [8, 9, 17], "look": [8, 9, 12], "param": [8, 9], "andor": [8, 9], "pilatu": [8, 9], "3": [8, 9, 22, 26], "0": [8, 9, 15, 17, 22], "receiv": [8, 18], "intern": [8, 9, 20], "soon": 8, "earlier": 8, "function": [8, 12, 17], "itself": 8, "out": [8, 12, 17, 18], "up": [8, 9, 12, 14, 18, 25], "wa": [8, 9, 14, 22], "publish": [8, 22], "status": [8, 22], "within": [8, 12, 22], "motor": [8, 12, 17], "posit": [8, 17, 22], "If": [8, 12, 14, 17, 23, 26], "occur": 8, "dure": [8, 22], "stage": 8, "onward": 8, "sent": [8, 9, 22], "back": 8, "over": [8, 9, 12], "futur": 9, "my_plan": [9, 12, 18], "b": 9, "becom": [9, 12], "myplanmodel": 9, "That": 9, "pars": 9, "howev": [9, 13], "cover": 9, "doesn": 9, "t": [9, 14, 21], "simpl": 9, "primit": [9, 17], "instead": [9, 14, 16, 17, 23], "ophyd": [9, 17, 22], "cannot": [9, 17], "network": 9, "string": [9, 22, 23], "repres": [9, 22], "id": [9, 22], "suppos": 9, "load": [9, 12], "avail": [9, 12, 15, 16, 17, 21, 23, 25], "signatur": 9, "instanc": [9, 17, 27], "extend": [9, 17], "origin": [9, 17, 22], "allow": [9, 22, 23], "deserialis": [9, 17], "correct": 9, "intermedi": 9, "process": 9, "never": [9, 17], "runtim": [9, 17], "fact": 9, "access": [9, 15, 17, 18, 22], "via": [9, 11, 12, 18, 25, 27], "closur": [9, 17], "circumv": 9, "usual": 9, "problem": 9, "abl": 9, "extern": [9, 22], "place": [9, 12, 14], "level": 9, "my_weird_plan": 9, "c": [9, 21], "dict": [9, 17], "d": 9, "practic": [11, 18], "step": [11, 12, 18], "experienc": [11, 18], "your": [11, 13, 14, 17, 18, 25], "applic": [11, 12, 18, 22], "contribut": [11, 18], "cli": [11, 13, 18, 21, 25, 27], "write": [11, 13, 18], "custom": [12, 15, 27], "tailor": 12, "individu": 12, "experiment": 12, "ad": [12, 17], "both": 12, "relev": 12, "path": [12, 13, 21, 26, 27], "part": 12, "librari": [12, 14, 17, 18], "instal": [12, 15, 16, 18, 24, 25, 27], "edit": [12, 13], "tweak": 12, "pypi": [12, 18], "github": [12, 14, 16, 18, 22, 25, 26], "repositori": [12, 14], "local": 12, "directori": [12, 17], "pyproject": 12, "toml": 12, "file": [12, 13, 14, 17, 21, 22, 27], "easiest": 12, "put": [12, 23], "skeleton": 12, "guid": [12, 14, 18, 24], "standard": [12, 17], "tutori": [12, 18], "annot": [12, 18], "mani": 12, "singl": [12, 17], "spread": 12, "multipl": [12, 17, 18], "movabl": [12, 17], "sample_nam": 12, "extra_metadata": 12, "logic": 12, "goe": 12, "here": [12, 18, 24], "dodal": [12, 17], "style": [12, 22], "factori": [12, 17], "mytypeofdetector": 12, "determin": 12, "automat": [12, 18], "pick": 12, "similarli": 12, "organ": 12, "per": 12, "prefer": 12, "my_facility_devic": 12, "my_detector": 12, "other_config": 12, "foo": [12, 17, 18], "extra": 12, "preserv": 12, "side": 12, "effect": 12, "each": 12, "own": [12, 13, 14], "were": 12, "my_plan_librari": 12, "tomographi": 12, "env": 12, "sourc": [12, 14, 18, 25, 26], "kind": 12, "insid": [12, 18, 25], "referenc": [12, 22], "initi": [12, 22], "particular": [12, 23], "my_lab": 12, "my_beamlin": 12, "planfunct": 12, "loop": 12, "virtual": [12, 25], "support": [12, 17], "share": [12, 14], "filesystem": [12, 17], "chosen": 12, "helm": 12, "chart": 12, "mount": 12, "host": [12, 15, 27], "machin": 12, "yaml": [12, 13, 21], "hostpath": 12, "dls_sw": 12, "softwar": [12, 26], "clone": 12, "incorpor": 12, "startup": 12, "still": 12, "those": [12, 17], "By": [13, 15, 23], "ingest": 13, "overrid": 13, "command": [13, 15, 18, 19, 25, 27], "found": 13, "schema": [13, 17, 22], "src": 13, "py": [13, 17], "applicationconfig": 13, "simpli": 13, "rel": 13, "wish": 13, "Then": 13, "subsequ": 13, "call": [13, 17, 18, 23], "child": 13, "welcom": 14, "pleas": [14, 17], "befor": 14, "great": 14, "idea": 14, "involv": [14, 22], "big": 14, "ticket": 14, "make": [14, 17], "want": 14, "sure": 14, "don": 14, "spend": 14, "might": 14, "fit": 14, "scope": 14, "offer": 14, "question": 14, "open": [14, 17, 23], "obviou": 14, "close": 14, "rais": 14, "100": 14, "bug": 14, "significantli": 14, "reduc": 14, "easili": [14, 18], "caught": 14, "remain": [14, 22], "same": 14, "improv": 14, "recommend": [14, 26], "vscode": [14, 15, 25], "devcontain": 14, "container": 14, "suit": 14, "diamond": [14, 17, 22], "light": 14, "common": [14, 17], "test": [14, 15], "pre": [14, 16], "commit": 14, "hook": 14, "come": [15, 27], "minim": [15, 18], "client": [15, 21, 22], "debug": [15, 18, 24], "product": 15, "tell": [15, 27], "talk": 15, "broker": 15, "tcp": 15, "localhost": 15, "61613": 15, "h": 15, "my": 15, "p": 15, "61614": 15, "sleep": 15, "5": [15, 17, 27], "current_det": 15, "image_det": 15, "block": 15, "statu": [15, 22, 23], "full": [15, 21, 27], "line": [15, 18, 19, 25, 27], "interfac": [15, 18, 19, 26, 27], "built": 16, "alreadi": 16, "docker": [16, 18, 27], "ghcr": [16, 18], "io": [16, 18, 25], "diamondlightsourc": [16, 18, 22, 25, 26], "version": [16, 20, 21, 22, 25], "podman": [16, 27], "get": [16, 18, 21, 23], "releas": [16, 18, 19, 26], "carefulli": 17, "risk": 17, "lose": 17, "incorrectli": 17, "introduct": 17, "advic": 17, "addit": [17, 25], "explain": 17, "sens": 17, "msg": 17, "distinguish": 17, "distinct": 17, "subset": 17, "expos": [17, 18], "alon": 17, "least": 17, "open_run": 17, "close_run": 17, "descript": [17, 22], "experi": 17, "plan_stub": 17, "plangener": 17, "minimum": 17, "enabl": 17, "input": 17, "broad": 17, "possibl": [17, 23], "implement": 17, "suffici": 17, "accomplish": 17, "drive": 17, "generalis": 17, "move_to_each_posit": 17, "axi": 17, "specificimplementationmov": 17, "_": 17, "rang": 17, "abs_set": 17, "locat": [17, 18], "formalis": 17, "bluesky_protocol": 17, "often": 17, "mostli": 17, "alwai": 17, "instanti": 17, "bypass": 17, "defer": [17, 21, 23], "long": 17, "touch_synchrotron": 17, "sync": 17, "synchrotron": 17, "There": 17, "know": 17, "except": 17, "specific_funct": 17, "rich": 17, "attach": 17, "scan": [17, 18, 22], "encourag": 17, "final": 17, "do": 17, "empti": 17, "down": 17, "pass_metadata": 17, "x": [17, 22], "much": 17, "ascertain": 17, "unit": [17, 22], "second": [17, 21], "microsecond": 17, "temp_pressure_snapshot": 17, "temperatur": 17, "sample_temperatur": 17, "pressur": 17, "sample_pressur": 17, "target_temperatur": 17, "273": 17, "target_pressur": 17, "10": 17, "move": 17, "captur": 17, "frame": 17, "sampl": 17, "stp": 17, "target": [17, 22], "kelvin": 17, "pa": 17, "async": 17, "major": 17, "absolut": 17, "onto": 17, "intend": 17, "begin": [17, 22], "attach_metadata": 17, "ophyd_async_snapshot": 17, "knowledg": 17, "snapshot": 17, "mayb": 17, "repeated_snapshot": 17, "inner_funct": 17, "factor": 17, "re": 17, "piec": 17, "nudg": 17, "wait": [17, 23], "consum": 17, "previou": [17, 23], "without": 17, "equival": 17, "under": 17, "condit": [17, 22], "__init__": 17, "__exports__": 17, "__all__": 17, "standalon": 17, "rehom": 17, "beamlin": 17, "rehome_devic": 17, "await": 17, "callback": 17, "analysi": 17, "await_callback": 17, "lightweight": 18, "wrapper": 18, "usabl": 18, "http": [18, 22, 25, 26], "endpoint": [18, 23], "lab": 18, "peopl": 18, "equip": 18, "possibli": 18, "remot": 18, "premis": 18, "boilerpl": 18, "bar": 18, "invok": 18, "few": 18, "rest": [18, 19, 21], "split": 18, "four": 18, "categori": 18, "quickstart": [18, 24], "usag": [18, 24], "explan": 18, "index": [18, 19], "technic": [18, 19], "materi": [18, 19], "__version__": 20, "calcul": 20, "pypa": 20, "setuptools_scm": 20, "show": 21, "exit": 21, "util": 21, "introspect": 21, "current": [21, 22, 23, 26], "mark": [21, 23], "ongo": 21, "reason": [21, 23], "output": 21, "next": [21, 23], "checkpoint": [21, 23], "timeout": 21, "hang": 21, "forev": 21, "print": 21, "success": [21, 23], "o": 21, "save": 21, "u": 21, "page": [22, 23], "channel": 22, "asyncapi": 22, "6": 22, "com": [22, 26], "info": 22, "titl": 22, "contact": 22, "callum": 22, "forrest": 22, "email": 22, "ac": 22, "uk": 22, "licens": 22, "apach": 22, "url": 22, "www": 22, "org": 22, "html": [22, 25], "defaultcontenttyp": 22, "public": 22, "oper": 22, "suppli": 22, "operationid": 22, "dataev": 22, "summari": 22, "oneof": 22, "ref": 22, "compon": 22, "workerstateev": 22, "workerprogressev": 22, "taggedstartdocu": 22, "taggeddescriptordocu": 22, "taggedeventdocu": 22, "taggedstopdocu": 22, "taggedresourcedocu": 22, "taggeddatumdocu": 22, "taggedresourcestream": 22, "taggeddatumstream": 22, "taggedeventpag": 22, "taggeddatumpag": 22, "todo": 22, "correlationid": 22, "bind": 22, "messageid": 22, "runstart": 22, "indic": 22, "previous": 22, "specifi": 22, "header": 22, "contexthead": 22, "payload": 22, "properti": 22, "doc": 22, "raw": 22, "githubusercont": 22, "master": 22, "event_model": 22, "run_start": 22, "runstop": 22, "run_stop": 22, "eventstreamdescriptor": 22, "scientif": 22, "stream": 22, "measur": 22, "event_descriptor": 22, "eventpag": 22, "deprec": 22, "event_pag": 22, "resourc": 22, "databas": 22, "entri": 22, "later": [22, 26], "datum": 22, "datumpag": 22, "datum_pag": 22, "streamresourc": 22, "stream_resourc": 22, "streamdatum": 22, "slice": 22, "stream_datum": 22, "stateev": 22, "warn": 22, "workerst": 22, "taskstatu": 22, "arrai": 22, "item": 22, "progressev": 22, "tasknam": 22, "uniqu": [22, 23], "submit": [22, 23], "additionalproperti": 22, "statusview": 22, "destin": 22, "replydestin": 22, "temporari": 22, "caller": 22, "listen": 22, "identifi": 22, "exchang": 22, "enum": 22, "idl": 22, "halt": 22, "abort": [22, 23], "suspend": 22, "panick": 22, "unknown": 22, "taskcomplet": 22, "taskfail": 22, "reac": 22, "boolean": 22, "outcom": 22, "achiev": 22, "displaynam": 22, "precis": 22, "sensibl": 22, "displai": [22, 27], "integ": 22, "fals": [22, 23], "percentag": 22, "timeelaps": 22, "elaps": 22, "timeremain": 22, "estim": 22, "fastapi": 23, "interact": 23, "retriev": 23, "200": 23, "ok": 23, "422": 23, "unprocess": 23, "entiti": 23, "delet": 23, "post": 23, "201": 23, "task_id": 23, "transit": 23, "202": 23, "new_stat": 23, "resum": 23, "rewind": 23, "failur": 23, "400": 23, "bad": 23, "activ": [23, 25, 26], "409": 23, "conflict": 23, "dev": 25, "bin": [25, 26], "serv": [25, 27], "capabl": [25, 27], "navig": 25, "left": 25, "hand": 25, "menu": 25, "select": 25, "click": 25, "green": 25, "button": 25, "8": 26, "python3": 26, "interfer": 26, "m": 26, "now": 26, "featur": 26, "git": 26, "commandlin": 26, "act": 27, "laboratori": 27, "downstream": 27, "simplest": 27, "rm": 27, "net": 27, "rmohr": 27, "15": 27, "9": 27, "alpin": 27, "queri": 27}, "objects": {"": [[23, 0, 1, "get--devices", "/devices"], [23, 0, 1, "get--devices-name", "/devices/{name}"], [23, 1, 1, "delete--environment", "/environment"], [23, 0, 1, "get--environment", "/environment"], [23, 0, 1, "get--plans", "/plans"], [23, 0, 1, "get--plans-name", "/plans/{name}"], [23, 2, 1, "post--tasks", "/tasks"], [23, 1, 1, "delete--tasks-task_id", "/tasks/{task_id}"], [23, 0, 1, "get--tasks-task_id", "/tasks/{task_id}"], [23, 0, 1, "get--worker-state", "/worker/state"], [23, 3, 1, "put--worker-state", "/worker/state"], [23, 0, 1, "get--worker-task", "/worker/task"], [23, 3, 1, "put--worker-task", "/worker/task"], [20, 4, 0, "-", "blueapi"]], "blueapi.blueapi": [[20, 5, 1, "", "__version__"]], "blueapi-controller-abort": [[21, 6, 1, "cmdoption-blueapi-controller-abort-arg-REASON", "REASON"]], "blueapi-controller-pause": [[21, 6, 1, "cmdoption-blueapi-controller-pause-defer", "--defer"]], "blueapi-controller-run": [[21, 6, 1, "cmdoption-blueapi-controller-run-t", "--timeout"], [21, 6, 1, "cmdoption-blueapi-controller-run-t", "-t"], [21, 6, 1, "cmdoption-blueapi-controller-run-arg-NAME", "NAME"], [21, 6, 1, "cmdoption-blueapi-controller-run-arg-PARAMETERS", "PARAMETERS"]], "blueapi-schema": [[21, 6, 1, "cmdoption-blueapi-schema-o", "--output"], [21, 6, 1, "cmdoption-blueapi-schema-u", "--update"], [21, 6, 1, "cmdoption-blueapi-schema-o", "-o"], [21, 6, 1, "cmdoption-blueapi-schema-u", "-u"]], "blueapi": [[21, 6, 1, "cmdoption-blueapi-c", "--config"], [21, 6, 1, "cmdoption-blueapi-version", "--version"], [21, 6, 1, "cmdoption-blueapi-c", "-c"]]}, "objtypes": {"0": "http:get", "1": "http:delete", "2": "http:post", "3": "http:put", "4": "py:module", "5": "py:data", "6": "std:cmdoption"}, "objnames": {"0": ["http", "get", "HTTP get"], "1": ["http", "delete", "HTTP delete"], "2": ["http", "post", "HTTP post"], "3": ["http", "put", "HTTP put"], "4": ["py", "module", "Python module"], "5": ["py", "data", "Python data"], "6": ["std", "cmdoption", "program option"]}, "titleterms": {"explan": 0, "architectur": [1, 2, 3], "kei": 1, "compon": 1, "The": 1, "blueskycontext": 1, "object": 1, "worker": [1, 7, 15, 25, 27], "servic": 1, "decis": [2, 3, 4, 5, 6], "record": [2, 3], "1": 3, "statu": [3, 4, 5, 6], "context": [3, 4, 5, 6], "consequ": [3, 4, 5, 6], "2": [4, 5], "No": 4, "queue": 4, "api": [5, 20], "model": 5, "case": 5, "4": 6, "adopt": 6, "python": [6, 26], "copier": 6, "templat": 6, "project": [6, 14], "structur": [6, 18], "event": 7, "emit": 7, "reason": 7, "new": 7, "correl": 7, "id": 7, "header": 7, "lifecycl": 8, "plan": [8, 12, 15, 17, 21], "load": 8, "registr": 8, "startup": 8, "request": 8, "valid": [8, 9], "execut": 8, "type": [9, 17], "requir": 9, "solut": 9, "index": 10, "how": [11, 18], "guid": [11, 27], "add": 12, "devic": [12, 21], "your": [12, 26], "blueapi": [12, 17, 18, 20, 21], "environ": [12, 25, 26], "home": 12, "code": [12, 14], "format": 12, "configur": [12, 13], "scratch": 12, "area": 12, "kubernet": 12, "applic": 13, "contribut": 14, "issu": 14, "discuss": 14, "coverag": 14, "develop": [14, 25], "inform": 14, "control": [15, 21], "via": 15, "cli": 15, "basic": 15, "introspect": 15, "run": [15, 16, 21, 25, 27], "contain": 16, "start": [16, 25, 27], "write": 17, "blueski": [17, 25], "annot": 17, "allow": 17, "argument": 17, "inject": 17, "default": 17, "metadata": 17, "docstr": 17, "decor": 17, "stub": 17, "document": 18, "i": [18, 27], "refer": 19, "command": 21, "line": 21, "interfac": 21, "abort": 21, "listen": 21, "paus": 21, "resum": 21, "state": 21, "stop": 21, "schema": 21, "serv": 21, "messag": 22, "specif": [22, 23], "rest": 23, "tutori": 24, "debug": 25, "instal": 26, "check": 26, "version": 26, "creat": 26, "virtual": 26, "librari": 26, "quickstart": 27, "activemq": 27, "test": 27}, "envversion": {"sphinx.domains.c": 3, "sphinx.domains.changeset": 1, "sphinx.domains.citation": 1, "sphinx.domains.cpp": 9, "sphinx.domains.index": 1, "sphinx.domains.javascript": 3, "sphinx.domains.math": 2, "sphinx.domains.python": 4, "sphinx.domains.rst": 2, "sphinx.domains.std": 2, "sphinx.ext.intersphinx": 1, "sphinx.ext.viewcode": 1, "sphinx": 60}, "alltitles": {"Explanations": [[0, "explanations"]], "Architecture": [[1, "architecture"]], "Key Components": [[1, "key-components"]], "The BlueskyContext Object": [[1, "the-blueskycontext-object"]], "The Worker Object": [[1, "the-worker-object"]], "The Service Object": [[1, "the-service-object"]], "Architectural Decision Records": [[2, "architectural-decision-records"]], "1. Record architecture decisions": [[3, "record-architecture-decisions"]], "Status": [[3, "status"], [4, "status"], [5, "status"], [6, "status"]], "Context": [[3, "context"], [4, "context"], [5, "context"], [6, "context"]], "Decision": [[3, "decision"], [4, "decision"], [5, "decision"], [6, "decision"]], "Consequences": [[3, "consequences"], [4, "consequences"], [5, "consequences"], [6, "consequences"]], "2. No Queues": [[4, "no-queues"]], "2. API Model Case": [[5, "api-model-case"]], "4. Adopt python-copier-template for project structure": [[6, "adopt-python-copier-template-for-project-structure"]], "Events Emitted by the Worker": [[7, "events-emitted-by-the-worker"]], "Reasons": [[7, "reasons"]], "New Events": [[7, "new-events"]], "Correlation ID": [[7, "correlation-id"]], "Correlation ID Headers": [[7, "id2"]], "Lifecycle of a Plan": [[8, "lifecycle-of-a-plan"]], "Loading and Registration": [[8, "loading-and-registration"]], "Startup": [[8, "startup"]], "Request": [[8, "request"]], "Validation": [[8, "validation"]], "Execution": [[8, "execution"]], "Type Validators": [[9, "type-validators"]], "Requirement": [[9, "requirement"]], "Solution": [[9, "solution"]], "Index": [[10, "index"]], "How-to Guides": [[11, "how-to-guides"]], "Add Plans and Devices to your Blueapi Environment": [[12, "add-plans-and-devices-to-your-blueapi-environment"]], "Home of Code": [[12, "home-of-code"]], "Format": [[12, "format"]], "Configuration": [[12, "configuration"]], "Scratch Area on Kubernetes": [[12, "scratch-area-on-kubernetes"]], "Configure the application": [[13, "configure-the-application"]], "Contribute to the project": [[14, "contribute-to-the-project"]], "Issue or Discussion?": [[14, "issue-or-discussion"]], "Code Coverage": [[14, "code-coverage"]], "Developer Information": [[14, "developer-information"]], "Control the Worker via the CLI": [[15, "control-the-worker-via-the-cli"]], "Basic Introspection": [[15, "basic-introspection"]], "Running Plans": [[15, "running-plans"]], "Run in a container": [[16, "run-in-a-container"]], "Starting the container": [[16, "starting-the-container"]], "Writing Bluesky plans for Blueapi": [[17, "writing-bluesky-plans-for-blueapi"]], "Plans": [[17, "plans"]], "Type Annotations": [[17, "type-annotations"]], "Allowed Argument Types": [[17, "allowed-argument-types"]], "Injecting defaults": [[17, "injecting-defaults"]], "Metadata": [[17, "metadata"]], "Docstrings": [[17, "docstrings"]], "Decorators": [[17, "decorators"]], "Stubs": [[17, "stubs"]], "blueapi": [[18, "blueapi"], [20, "blueapi"], [21, "blueapi"]], "How the documentation is structured": [[18, "how-the-documentation-is-structured"]], "Reference": [[19, "reference"]], "API": [[20, "module-blueapi"]], "Command-Line Interface": [[21, "command-line-interface"]], "controller": [[21, "blueapi-controller"]], "abort": [[21, "blueapi-controller-abort"]], "devices": [[21, "blueapi-controller-devices"]], "listen": [[21, "blueapi-controller-listen"]], "pause": [[21, "blueapi-controller-pause"]], "plans": [[21, "blueapi-controller-plans"]], "resume": [[21, "blueapi-controller-resume"]], "run": [[21, "blueapi-controller-run"]], "state": [[21, "blueapi-controller-state"]], "stop": [[21, "blueapi-controller-stop"]], "schema": [[21, "blueapi-schema"]], "serve": [[21, "blueapi-serve"]], "Messaging Specification": [[22, "messaging-specification"]], "REST Specification": [[23, "rest-specification"]], "Tutorials": [[24, "tutorials"]], "Run/Debug in a Developer Environment": [[25, "run-debug-in-a-developer-environment"]], "Start Bluesky Worker": [[25, "start-bluesky-worker"]], "Installation": [[26, "installation"]], "Check your version of python": [[26, "check-your-version-of-python"]], "Create a virtual environment": [[26, "create-a-virtual-environment"]], "Installing the library": [[26, "installing-the-library"]], "Quickstart Guide": [[27, "quickstart-guide"]], "Start ActiveMQ": [[27, "start-activemq"]], "Start Worker": [[27, "start-worker"]], "Test that the Worker is Running": [[27, "test-that-the-worker-is-running"]]}, "indexentries": {"blueapi": [[20, "module-blueapi"]], "blueapi.__version__ (in module blueapi)": [[20, "blueapi.blueapi.__version__"]], "module": [[20, "module-blueapi"]], "--config": [[21, "cmdoption-blueapi-c"]], "--defer": [[21, "cmdoption-blueapi-controller-pause-defer"]], "--output": [[21, "cmdoption-blueapi-schema-o"]], "--timeout": [[21, "cmdoption-blueapi-controller-run-t"]], "--update": [[21, "cmdoption-blueapi-schema-u"]], "--version": [[21, "cmdoption-blueapi-version"]], "-c": [[21, "cmdoption-blueapi-c"]], "-o": [[21, "cmdoption-blueapi-schema-o"]], "-t": [[21, "cmdoption-blueapi-controller-run-t"]], "-u": [[21, "cmdoption-blueapi-schema-u"]], "name": [[21, "cmdoption-blueapi-controller-run-arg-NAME"]], "parameters": [[21, "cmdoption-blueapi-controller-run-arg-PARAMETERS"]], "reason": [[21, "cmdoption-blueapi-controller-abort-arg-REASON"]], "blueapi command line option": [[21, "cmdoption-blueapi-c"], [21, "cmdoption-blueapi-version"]], "blueapi-controller-abort command line option": [[21, "cmdoption-blueapi-controller-abort-arg-REASON"]], "blueapi-controller-pause command line option": [[21, "cmdoption-blueapi-controller-pause-defer"]], "blueapi-controller-run command line option": [[21, "cmdoption-blueapi-controller-run-arg-NAME"], [21, "cmdoption-blueapi-controller-run-arg-PARAMETERS"], [21, "cmdoption-blueapi-controller-run-t"]], "blueapi-schema command line option": [[21, "cmdoption-blueapi-schema-o"], [21, "cmdoption-blueapi-schema-u"]]}})