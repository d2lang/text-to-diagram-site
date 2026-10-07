#!/bin/sh
set -eu
. "$(dirname "$0")/../ci/sub/lib.sh"
cd -- "$(dirname "$0")/.."

_d2() {
  sh_c D2_LAYOUT=tala hide d2 --omit-version ./src/examples/"$ex"/syntax/d2.d2 ./src/examples/"$ex"/render/d2_tala.svg
  sh_c D2_LAYOUT=dagre hide d2 --omit-version ./src/examples/"$ex"/syntax/d2.d2 ./src/examples/"$ex"/render/d2_dagre.svg
  sh_c D2_LAYOUT=elk hide d2 --omit-version ./src/examples/"$ex"/syntax/d2.d2 ./src/examples/"$ex"/render/d2_elk.svg
}

_mmdc() {
  echo '{ "layout": "elk" }' > ./mermaid-elk.config.json
  sh_c mmdc -i ./src/examples/"$ex"/syntax/mermaid.mmd -o ./src/examples/"$ex"/render/mermaid_dagre.svg
  sh_c mmdc -i ./src/examples/"$ex"/syntax/mermaid.mmd -c ./mermaid-elk.config.json -o ./src/examples/"$ex"/render/mermaid_elk.svg
  rm ./mermaid-elk.config.json
}

_dot() {
  sh_c dot -Tsvg ./src/examples/"$ex"/syntax/graphviz.dot >src/examples/"$ex"/render/graphviz_dot.svg
  sh_c dot -Kneato -Tsvg ./src/examples/"$ex"/syntax/graphviz.dot >src/examples/"$ex"/render/graphviz_neato.svg
}

_plantuml() {
  sh_c plantuml -Tsvg ./src/examples/"$ex"/syntax/plantuml.puml -o ../render
  mv ./src/examples/"$ex"/render/plantuml.svg ./src/examples/"$ex"/render/plantuml_dot.svg
}

main() {
  job_parseflags "$@"
  for ex in $(find ./src/examples -mindepth 1 -maxdepth 1 | sort -V); do
    ex=${ex#./src/examples/}
    export JOBNAME="$ex"
    if ! _runjob_filter; then
      continue
    fi

    bigheader "$ex"
    if [ -f ./src/examples/"$ex"/syntax/d2.d2 ]; then
      runjob _d2 &
    fi
    if [ -f ./src/examples/"$ex"/syntax/mermaid.mmd ]; then
      runjob _mmdc &
    fi
    if [ -f ./src/examples/"$ex"/syntax/graphviz.dot ]; then
      [ "$ex" != 8_text ] && runjob _dot &
    fi
    if [ -f ./src/examples/"$ex"/syntax/plantuml.puml ]; then
      runjob _plantuml &
    fi
    waitjobs
  done
  
  # Generate image imports after all renders are complete
  bigheader "Generating image imports"
  sh_c tsx ./scripts/generate-img-imports.ts
}

main "$@"
