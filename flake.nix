{
  description = "StockBuddy project dependencies";

  inputs = { nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable"; };
  outputs = { self, nixpkgs }: rec {
    system = "x86_64-linux";
    pkgs = import nixpkgs { inherit system; };
    corePackages = with pkgs; [ bun ];

    packages.${system} = {
      default = pkgs.mkShell { buildInputs = corePackages; };
    };

  };

}
