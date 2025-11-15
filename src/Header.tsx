import Search from "./Search";

type HeaderProps = {
  todoLength: boolean;
  className: string;
};

function Header({ todoLength, className }: HeaderProps) {
  return (
    <header className={className}>
      <div className="flex items-center justify-center">
        <h1 className="text-xl font-semibold">TODO LIST</h1>
      </div>

      {!todoLength && <Search />}
    </header>
  );
}

export default Header;
