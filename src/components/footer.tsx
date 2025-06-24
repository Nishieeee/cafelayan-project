import Link from "next/link";
import { Recycle } from "lucide-react";

export default function Footer() {

    return(
        <footer className="bg-gray-100 border-gray-500/50 py-6 border-t">
              <div className="container px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                  <div className="flex items-center mb-4 md:mb-0">
                    <Recycle className="h-5 w-5 text-green-600 mr-2" />
                    <span className="text-sm text-gray-600">© 2023 LoopLinkEco. <br></br> All rights reserved.</span>
                  </div>
                  <div className="flex space-x-4 text-sm text-gray-600">
                    <Link href="/privacy" className="hover:text-gray-900">
                      Privacy
                    </Link>
                    <Link href="/terms" className="hover:text-gray-900">
                      Terms
                    </Link>
                    <Link href="/contact" className="hover:text-gray-900">
                      Contact
                    </Link>
                  </div>
                </div>
              </div>
            </footer>
    );
}