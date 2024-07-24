import { Input } from "../ui/input"
import { Button } from "../ui/button"
import Search from "../../assets/icons/Search"

export default function Component() {
  return (
    <div className="flex w-full max-w-sm items-center space-x-2">
      <Input type="search" placeholder="Search..." className='m-0 border-0 focus-visible:outline-0' />
      <Button type="submit" variant="ghost" className="h-9 w-9 flex items-center justify-center rounded-full">
        <span>
            <Search />
        </span>
        <div className="w-4 h-4" />
      </Button>
    </div>
  )
}