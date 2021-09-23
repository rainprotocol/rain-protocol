let
  pkgs = import <nixpkgs> { };

  local-node = pkgs.writeShellScriptBin "local-node" ''
    hardhat node
  '';

  local-fork = pkgs.writeShellScriptBin "local-fork" ''
    hardhat node --fork https://eth-mainnet.alchemyapi.io/v2/G0Vg_iZFiAuUD6hjXqcVg-Nys-NGiTQy --fork-block-number 11833335
  '';

  local-test = pkgs.writeShellScriptBin "local-test" ''
    hardhat test --network localhost
  '';

  local-deploy = pkgs.writeShellScriptBin "local-deploy" ''
    hardhat run --network localhost scripts/deploy.ts
  '';

  prettier-check = pkgs.writeShellScriptBin "prettier-check" ''
    prettier --check .
  '';

  prettier-write = pkgs.writeShellScriptBin "prettier-write" ''
    prettier --write .
  '';

  ci-lint = pkgs.writeShellScriptBin "ci-lint" ''
    solhint 'contracts/**/*.sol'
    prettier-check
  '';

  security-check = pkgs.writeShellScriptBin "security-check" ''
    # Slither does not like there being two IERC20.
    # One is from Balancer the other is from Open Zeppelin.
    # This patch swaps all the Balancer IERC20 imports with an Open Zeppelin IERC20 import.
    patch -p1 < slither-hack-balancer-ierc20.patch

    # Balancer has PoolParams struct defined inside a contract which slither does not like.
    # This patch moves PoolParams outside the contract and upates import references to it.
    patch -p1 < slither-hack-balancer-pool-params.patch
    patch -p1 < slither-hack-local-pool-params.patch

    # Workaround a slither bug due to stale compiled artifacts.
    # https://github.com/crytic/slither/issues/860
    rm -rf artifacts
    rm -rf typechain
    rm -rf cache

    # Install slither to a fresh tmp dir to workaround nix-shell immutability.
    export td=$(mktemp -d)
    python3 -m venv ''${td}/venv
    source ''${td}/venv/bin/activate
    pip install slither-analyzer

    # Run slither against all our contracts.
    # Disable npx as nix-shell already handles availability of what we need.
    # Some contracts are explicitly out of scope for slither:
    # - configurable-rights-pool contracts
    # - The test contracts that only exist so the test harness can drive unit tests and will never be deployed
    # - Open Zeppelin contracts
    slither . --npx-disable --filter-paths="contracts/test" --exclude-dependencies

    # Rollback all the slither specific patches.
    patch -R -p1 < slither-hack-balancer-ierc20.patch
    patch -R -p1 < slither-hack-balancer-pool-params.patch
    patch -R -p1 < slither-hack-local-pool-params.patch
  '';

  ci-test = pkgs.writeShellScriptBin "ci-test" ''
    hardhat test
  '';

  docgen = pkgs.writeShellScriptBin "docgen" ''
    rm -rf docs/api && npm run docgen
  '';

  docs-dev = pkgs.writeShellScriptBin "docs-dev" ''
    docgen && npm run start --prefix docusaurus
  '';

  docs-build = pkgs.writeShellScriptBin "docs-build" ''
    docgen && npm run build --prefix docusaurus
  '';

  docs-serve = pkgs.writeShellScriptBin "docs-serve" ''
    npm run serve --prefix docusaurus
  '';

  docs-version = pkgs.writeShellScriptBin "docs-version" ''
    docs-build && npm run docusaurus --prefix docusaurus docs:version ''${GIT_TAG}
  '';

  prepack = pkgs.writeShellScriptBin "prepack" ''
    set -euo pipefail
    shopt -s globstar

    npm run build

    mkdir -p dist/v6 && cp -rf artifacts/ dist/v6

    cp artifacts/contracts/**/*.json artifacts
    rm -rf artifacts/*.dbg.json
    rm -rf artifacts/*Test*
    rm -rf artifacts/*Reentrant*
    rm -rf artifacts/*ForceSendEther*
    rm -rf artifacts/*Mock*

    rm -rf typechain/**/*Test*
    rm -rf typechain/**/*Reentrant*
    rm -rf typechain/**/*ForceSendEther*
    rm -rf typechain/**/*Mock*
  '';

  prepublish = pkgs.writeShellScriptBin "prepublish" ''
    npm version patch --no-git-tag-version
    PACKAGE_NAME=$(node -p "require('./package.json').name")
    PACKAGE_VERSION=$(node -p "require('./package.json').version")
    cat << EOF


    Package version for $PACKAGE_NAME bumped to $PACKAGE_VERSION

    Please manually commit this change, and push up to the GitHub repo:

    $ git commit -am "$PACKAGE_VERSION"
    $ git push

    Now, you should either:
    - tag this commit locally and push it up
    - remotely cut a release on the GitHub repo (if you're having issues tagging the commit locally)

    Locally:
    $ git tag v$PACKAGE_VERSION -am "$PACKAGE_VERSION"
    $ git push origin v$PACKAGE_VERSION

    Remotely:
    Go to Releases -> Draft a new release
    Select this branch and create a new release with the following tag: v$PACKAGE_VERSION


    EOF
  '';
in
pkgs.stdenv.mkDerivation {
  name = "shell";
  buildInputs = [
    pkgs.nixpkgs-fmt
    pkgs.nodejs-14_x
    pkgs.python3
    local-node
    local-fork
    local-test
    local-deploy
    prettier-check
    prettier-write
    security-check
    ci-test
    ci-lint
    docgen
    docs-dev
    docs-build
    docs-serve
    docs-version
    prepack
    prepublish
  ];

  shellHook = ''
    export PATH=$( npm bin ):$PATH
    # keep it fresh
    npm install
    npm install --prefix docusaurus
  '';
}
