"use client"

import { Search, X } from "lucide-react";
import { ChangeEventHandler, KeyboardEventHandler, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "../ui/input";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import { Button } from "../ui/button";

const Searchbar = () => {
  const [value, setValue] = useState('')
  const navigate = useNavigate()
  const dialogCloseRef = useRef<React.ElementRef<typeof DialogClose>>(null);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value)    
  }

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (!value) return
    if (e.key === 'Enter') {
      navigate(`/pretraga?q=${encodeURIComponent(value)}`)
      closeDialog()
    }
  };

  const onClick: React.MouseEventHandler<HTMLButtonElement> = () => {
    if (!value) return
    navigate(`/pretraga?q=${encodeURIComponent(value)}`)
  }

  const closeDialog = () => {
    // Check if the ref is defined before attempting to close
    if (dialogCloseRef.current) {
      // Trigger the close action
      dialogCloseRef.current.click();
    }
  };

  return (
    <>
      <div className="relative hidden sm:block">
        <Search
          className="h-4 w-4 absolute text-black top-3 left-1"
        />
        <Input
          onChange={onChange}
          onKeyDown={onKeyDown}
          value={value}
          className="w-full sm:w-40 lg:w-72 text-black pl-9 bg-transparent placeholder:text-black border-x-0 border-t-0 rounded-none focus-visible:ring-offset-0 focus-visible:ring-0"
          placeholder="Pretražite"
        />
        {value && (
          <X onClick={() => setValue("")} className="h-4 w-4 text-white absolute top-3 right-1 cursor-pointer" />
        )}
      </div>

      <div className="sm:hidden">
        <Dialog>
          <DialogTrigger asChild>
            <Button size="icon" variant="ghost" className="relative">
              <Search size={24} />  
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm top-40">
            <div className="relative">
              <Search
                className="h-4 w-4 absolute top-3 left-1"
              />
              <Input
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
                className="w-full sm:w-40 lg:w-72 pl-9 bg-transparent border-x-0 border-t-0 rounded-none focus-visible:ring-offset-0 focus-visible:ring-0"
                placeholder="Unesite pojam"
              />
              {value && (
                <X onClick={() => setValue("")} className="h-4 w-4 absolute top-3 right-1 cursor-pointer" />
              )}
            </div>
            <DialogClose ref={dialogCloseRef} asChild>
              <Button onClick={onClick}>
                Pretraži
              </Button>
            </DialogClose>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default Searchbar;