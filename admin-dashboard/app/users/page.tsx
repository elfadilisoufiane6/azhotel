"use client";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="font-display text-3xl text-midnight-800">Customers</h1>
        <p className="text-sm text-zinc-500 mt-1">Loyalty members, registered guests, and account history.</p>
      </header>

      <div className="card card-pad text-center text-zinc-500">
        Customer directory will appear here. Connect to <code className="font-mono text-xs">/api/users</code>.
      </div>
    </div>
  );
}
