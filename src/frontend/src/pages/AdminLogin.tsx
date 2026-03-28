import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import { useActor } from "../hooks/useActor";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import type { Page } from "./LandingPage";

interface Props {
  onAdminLogin: () => void;
  onBack: () => void;
  onNavigate: (page: Page) => void;
}

export default function AdminLogin({ onAdminLogin, onBack }: Props) {
  const { login, loginStatus, identity, isLoggingIn } = useInternetIdentity();
  const { actor } = useActor();

  useEffect(() => {
    if (loginStatus === "success" && identity && actor) {
      actor
        .isCallerAdmin()
        .then((isAdmin) => {
          if (isAdmin) {
            onAdminLogin();
          }
        })
        .catch(() => {});
    }
  }, [loginStatus, identity, actor, onAdminLogin]);

  return (
    <div className="min-h-screen font-nunito bg-background flex flex-col">
      <header className="bg-black shadow-xs">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="flex items-center gap-1 text-gray-400 hover:text-white font-semibold text-sm"
            data-ocid="admin_login.back.button"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <img
            src="/assets/generated/classio-kids-logo-transparent.dim_400x120.png"
            alt="Classio Kids"
            className="h-12 w-auto object-contain ml-2"
          />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-hero w-full max-w-md p-8"
          data-ocid="admin_login.modal"
        >
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-footer-navy rounded-full flex items-center justify-center mb-3">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-extrabold text-footer-navy">
              Admin Login
            </h1>
            <p className="text-gray-500 text-sm mt-1 text-center">
              Sign in with Internet Identity to access the admin dashboard
            </p>
          </div>

          {loginStatus === "success" ? (
            <div className="text-center" data-ocid="admin_login.success_state">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-600" />
              <p className="font-bold text-gray-700">
                Verifying admin access...
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <Button
                onClick={login}
                disabled={isLoggingIn}
                className="w-full rounded-full h-12 text-base font-extrabold bg-footer-navy text-white hover:opacity-90"
                data-ocid="admin_login.submit.button"
              >
                {isLoggingIn ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : (
                  <ShieldCheck className="w-5 h-5 mr-2" />
                )}
                {isLoggingIn ? "Connecting..." : "Login with Internet Identity"}
              </Button>
              {loginStatus === "loginError" && (
                <div
                  className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 text-sm font-semibold"
                  data-ocid="admin_login.error_state"
                >
                  ⚠️ Login failed. Please try again.
                </div>
              )}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}
