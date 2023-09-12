COMMIT_MSG_HOOK='\#!/bin/bash\nMSG_FILE=$$1\n./venv/bin/cz check --allow-abort --commit-msg-file $$MSG_FILE'

init_flow:
	git config --local gitflow.branch.master main
	git config --local gitflow.branch.develop dev
	git flow init -d -f -p feat- -b bug- -r rel- -x hot- -s sup- -t v.

init_deps:
	npm install -g yarn
	npm install -g npm@latest
	npm install -g react-dev-tools
	yarn install

init_project:
	make init_flow
	make init_deps

generate-commit-file:
	git rev-parse --short HEAD | ./venv/bin/python -c "import sys; hash_commit=str(sys.stdin.read()).strip(); print('commit = \'{}\''.format(hash_commit), file=sys.stdout)" > version.txt
