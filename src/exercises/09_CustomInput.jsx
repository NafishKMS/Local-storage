import { forwardRef, useImperativeHandle, useRef } from "react";

const CustomInput = forwardRef(function CustomInput({ placeholder }, ref) {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    focus: () => inputRef.current?.focus(),
    clear: () => {
      if (inputRef.current) inputRef.current.value = "";
    },
    getValue: () => inputRef.current?.value ?? "",
  }));

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      className="w-full rounded-xl border border-[#E6DED3] bg-[#FDFBF7] px-5 py-3.5 text-stone-800 placeholder:text-stone-400 outline-none focus:border-[#8C7B6C] focus:ring-2 focus:ring-[#8C7B6C]/20"
    />
  );
});

export default function CustomInputDemo() {
  const inputRef = useRef(null);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-stone-800">9. useImperativeHandle — Custom Input</h2>

      <CustomInput ref={inputRef} placeholder="Ketik sesuatu..." />

      <div className="flex gap-2">
        <button
          onClick={() => inputRef.current?.focus()}
          className="rounded-xl bg-[#8C7B6C] px-4 py-2.5 text-sm font-semibold text-[#FDFBF7] hover:bg-[#6B5D50]"
        >
          Fokus dari Parent
        </button>
        <button
          onClick={() => inputRef.current?.clear()}
          className="rounded-xl border border-[#E6DED3] px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-[#F5EFE6]"
        >
          Clear dari Parent
        </button>
        <button
          onClick={() => alert(inputRef.current?.getValue())}
          className="rounded-xl border border-[#E6DED3] px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-[#F5EFE6]"
        >
          Get Value
        </button>
      </div>

      <p className="text-xs text-stone-400">
        Parent hanya bisa memanggil <code className="rounded bg-[#F5EFE6] px-1">focus()</code>,{" "}
        <code className="rounded bg-[#F5EFE6] px-1">clear()</code>, dan{" "}
        <code className="rounded bg-[#F5EFE6] px-1">getValue()</code> — bukan seluruh DOM node.
      </p>
    </div>
  );
}