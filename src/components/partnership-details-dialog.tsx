"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Building2, User, Mail, Phone, Package, MessageSquare, Check, X } from "lucide-react"

interface PartnershipDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  request: {
    brandName: string
    logo: string
    requestDate: string
    expectedVolume: string
    partnershipType: string
    contactPerson: string
    email: string
    phone?: string
    message: string
    city: string
    productTypes?: string[]
    companySize?: string
    sustainabilityGoals?: string
  }
}

export function PartnershipDetailsDialog({ open, onOpenChange, request }: PartnershipDetailsDialogProps) {
  const [response, setResponse] = useState("")
  const [isAccepting, setIsAccepting] = useState(false)
  const [isDeclining, setIsDeclining] = useState(false)

  const handleAccept = () => {
    setIsAccepting(true)
    // Simulate API call
    setTimeout(() => {
      setIsAccepting(false)
      onOpenChange(false)
      // Show success message
    }, 1500)
  }

  const handleDecline = () => {
    setIsDeclining(true)
    // Simulate API call
    setTimeout(() => {
      setIsDeclining(false)
      onOpenChange(false)
      // Show decline confirmation
    }, 1500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange} data-aos="fade" data-aos-delay="200">
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Partnership Request Details
          </DialogTitle>
          <DialogDescription>Review the partnership request from {request.brandName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Company Information */}
          <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 bg-white rounded-lg overflow-hidden">
              <img
                src={request.logo || "/placeholder.svg"}
                alt={request.brandName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-medium">{request.brandName}</h3>
              <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  <span>{request.city}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Package className="h-3 w-3" />
                  <span>{request.expectedVolume}</span>
                </div>
              </div>
              <Badge variant="outline" className="mt-2">
                {request.partnershipType}
              </Badge>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <User className="h-4 w-4 text-gray-400" />
                  <span>{request.contactPerson}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <span>{request.email}</span>
                </div>
                {request.phone && (
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{request.phone}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="font-medium">Partnership Details</h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Request Date:</span>
                  <span className="ml-2">{request.requestDate}</span>
                </div>
                <div>
                  <span className="text-gray-500">Expected Volume:</span>
                  <span className="ml-2">{request.expectedVolume}</span>
                </div>
                <div>
                  <span className="text-gray-500">Partnership Type:</span>
                  <span className="ml-2">{request.partnershipType}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Product Types */}
          {request.productTypes && (
            <div>
              <h4 className="font-medium mb-2">Product Types</h4>
              <div className="flex flex-wrap gap-2">
                {request.productTypes.map((type, index) => (
                  <Badge key={index} variant="outline">
                    {type}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Message */}
          <div>
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Message from {request.brandName}
            </h4>
            <div className="p-3 bg-gray-50 rounded-lg text-sm">{request.message}</div>
          </div>

          {/* Sustainability Goals */}
          {request.sustainabilityGoals && (
            <div>
              <h4 className="font-medium mb-2">Sustainability Goals</h4>
              <div className="p-3 bg-green-50 rounded-lg text-sm">{request.sustainabilityGoals}</div>
            </div>
          )}

          {/* Response Section */}
          <div>
            <Label htmlFor="response">Your Response (Optional)</Label>
            <Textarea
              id="response"
              placeholder="Add any comments or questions for the brand..."
              value={response}
              onChange={(e) => setResponse(e.target.value)}
              className="mt-1"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleDecline} variant="outline" className="flex-1" disabled={isAccepting || isDeclining}>
              {isDeclining ? (
                <>
                  <X className="mr-2 h-4 w-4 animate-spin" />
                  Declining...
                </>
              ) : (
                <>
                  <X className="mr-2 h-4 w-4" />
                  Decline Request
                </>
              )}
            </Button>
            <Button
              onClick={handleAccept}
              className="flex-1 bg-green-700 hover:bg-green-800 text-white"
              disabled={isAccepting || isDeclining}
            >
              {isAccepting ? (
                <>
                  <Check className="mr-2 h-4 w-4 animate-spin" />
                  Accepting...
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  Accept Partnership
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
